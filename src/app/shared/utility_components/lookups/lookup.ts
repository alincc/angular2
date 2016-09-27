import {Component, ContentChild, ChangeDetectionStrategy, Input, Attribute, Output, EventEmitter, ElementRef, Renderer, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {ChLookupItemTemplate} from './item';
import {ChPill} from '../pills/pill';
import {ChPillRemove} from '../pills/pill-remove';

import {ChInternalLookupScope} from './scope';
import {ChLookupScopeItem} from './scope-item';

@Component({
  selector: 'ch-lookup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lookups.component.html',
  styles: [
    require('./lookups.component.scss')
  ],
})

export class ChLookup {

  @ContentChild(ChLookupItemTemplate) itemTemplate: ChLookupItemTemplate;
  @ContentChild(ChLookupScopeItem) polymorphic: ChLookupScopeItem;

  @Input() placeholder: string;
  @Input() searchIcon: boolean = true;

  openScope: boolean = false;

  @Input() set value(value: string) {
    if (value !== this.inputSubject.getValue()) {
      this.inputValue = value;
      this.inputSubject.next(value);
    }
  }
  @Output() valueChange = new EventEmitter<string>();

  @Input() lookup: Function;
  @Input() field: string;

  pick: any;
  @Input('pick') set setPick(pick: any) {
    this.inputValue = this.resolveLabel(pick);
    this.pick = pick;
  }
  @Output() pickChange = new EventEmitter();

  @ViewChild('lookupInput') inputEl: ElementRef;

  inputId = this.uniqueId('lookup_input');

  private globalClickUnsubscriber: Function = null;
  private _open = false;
  @Input() set open(_open: boolean) {
    if (this.open === _open) return;
    if (_open) {
      this.globalClickUnsubscriber = this.renderer.listenGlobal('document', 'click', ($event: MouseEvent) => {
        this.globalClickHandler($event);
        this.detector.markForCheck();
      });
    } else {
      this.activeIndex = -1;
      this.unsubscribeGlobalClick();
    }
    this._open = _open;
  }
  get open(): boolean {
    return this._open;
  }

  // Similar to `lodash.isobject`
  isObject(value: any): boolean {
    const type = typeof value;
    return !!value && (type === 'object' || type === 'function');
  }

  // Generate a unique id (unique within the entire client session).
  // Useful for temporary DOM ids.

  uniqueId(prefix: any){
    if(!prefix) prefix = 'uid';
    let idCounter = 0;
    return `ch_${prefix}_${++idCounter}`;
  }

  private inputValue = '';
  private inputSubject = new BehaviorSubject(undefined);
  private suggestions: any[];
  private noResults: boolean = false;
  private activeIndex: number = -1;
  private lastUserInput: string;
  private pendingFocus = false;

  constructor(private element: ElementRef, private renderer: Renderer, private detector: ChangeDetectorRef,
              @Attribute('debounce') private debounce: number) {
    if (this.debounce === null) {
      this.debounce = 200;
    }
  }

  handlePick(item: any) {
    this.pickChange.emit(item);
    
    setTimeout(()=>{
      this.inputValue = '';
    },100);
    this.suggestions = [];
    this.open = false;
  }

  onInputChange(value: string) {
    this.inputSubject.next(value);
  }

  ngOnInit() {
    let valueStream = this.inputSubject.skip(1)
      .do((value: string) => {
        this.lastUserInput = value;
        this.activeIndex = -1;
        this.valueChange.emit(value);
      });

    if (this.debounce > 0) {
      valueStream = valueStream.debounceTime(this.debounce);
    }

    const suggestions$ = valueStream
      .distinctUntilChanged()
      .switchMap((value: string) => {
        const suggestions = this.lookup(value);
        return suggestions instanceof Observable ? suggestions : Observable.of(suggestions);
      })
      .publish().refCount(); // Siche instance

    suggestions$.subscribe((suggestions: any[]) => {
      this.suggestions = suggestions;
      this.noResults = Array.isArray(suggestions) && !suggestions.length;
      this.open = !!suggestions;
      this.detector.markForCheck();
    });
  }

  resolveLabel(item: any) {
    return this.field && this.isObject(item) ? item[this.field] : item;
  }

  close(evt: KeyboardEvent) {
    if (evt) {
      evt.preventDefault();
    }else{
      evt  = null;
    }
    this.open = false;
  }

  globalClickHandler($event: MouseEvent) {
    var nativeElement = this.element.nativeElement;
    if ($event.target === nativeElement || nativeElement.contains($event.target)) {
      return;
    }
    this.open = false;
  }

  optionId(index: number) {
    return index < 0 ? null : `${this.inputId}_active_${index}`;
  }

  pickActive(evt: any) {
    if (this.activeIndex < 0){
      this.handlePick(evt.target.value);
      return;
    } 
    this.handlePick(this.suggestions[this.activeIndex]);
  }

  moveActive(evt: KeyboardEvent, moves: number) {
    evt.preventDefault();
    if (!this.expanded) return;

    this.activeIndex = Math.max(-1, Math.min(this.activeIndex + moves, this.suggestions.length - 1));

    // Update input value based on active option
    const value = this.activeIndex === -1 ? this.lastUserInput : this.resolveLabel(this.suggestions[this.activeIndex]);
    this.inputValue = value;
  }

  onScopeOpen(open: boolean) {
    if (open) {
      this.close(null);
    }
    this.openScope = open;
  }

  scopeSelect(scope: any) {
    this.openScope = false;
    this.focus();
    this.polymorphic.scopeChange.emit(scope);
  }

  ngAfterViewChecked() {
    if (this.pendingFocus && !this.pick) {
      this.focus();
    }
    this.pendingFocus = false;
  }

  clear() {
    this.pickChange.emit(null);
    this.pendingFocus = true;
  }

  focus() {
    this.renderer.invokeElementMethod(this.inputEl.nativeElement, 'focus', []);
  }

  // Whether menu is expanded
  get expanded(): boolean {
    return this.open && !this.pick;
  }

  ngOnDestroy() {
    this.unsubscribeGlobalClick();
  }

  private unsubscribeGlobalClick() {
    if (!this.globalClickUnsubscriber) return;
    this.globalClickUnsubscriber();
    this.globalClickUnsubscriber = null;
  }
}
