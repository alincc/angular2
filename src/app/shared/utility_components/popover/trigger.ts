import {Directive, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef, Renderer, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory} from '@angular/core';
import * as Tether from 'tether';
import {ChPopover, Direction} from './popover';
import {placement} from './placements';

@Directive({
  selector: '[chPopover]',
})
export class ChPopoverTrigger {

  @Input() chPopover: string | TemplateRef<any>;

  @Input() set chPopoverPlacement(_placement: Direction) {
    this.placement = _placement || 'top';
    this.setTether();
  }

  @Input() set chPopoverTheme(theme: string) {
    this.theme = theme;
    this.setPopover();
  }

  @Input() chTooltip: string | boolean;

  @Input() set chOpen(open: boolean) {
    if (open) {
      this.create();
    } else {
      this.destroy();
    }
  }

  private popover: ChPopover;
  private popoverFactory: ComponentFactory<ChPopover>;
  private componentRef: ComponentRef<ChPopover>;
  private placement: Direction = 'top';
  private theme: string;
  private tether: Tether;

  constructor(private element: ElementRef, private viewContainer: ViewContainerRef, private injector: Injector,
              private renderer: Renderer, componentFactoryResolver: ComponentFactoryResolver) {
    this.popoverFactory = componentFactoryResolver.resolveComponentFactory(ChPopover);
  }

  ngOnDestroy() {
    this.destroy();
  }

  private setTether(create = false) {
    if (!this.tether && !create) return;

    const { attachment, targetAttachment, offset } = placement(this.placement);
    const options = {
      element: this.popover.element.nativeElement,
      target: this.element.nativeElement,
      attachment,
      targetAttachment,
      offset,
    };

    if (create) {
      this.tether = new Tether(options);
    } else {
      this.tether.setOptions(options);
    }

    this.setPopover();
  }

  private setPopover() {
    if (!this.popover) return;

    const { opposite } = placement(this.placement);
    this.popover.nubbin = opposite;
    this.popover.theme = this.theme;
    this.popover.chTooltip = this.chTooltip;
  }

  private create() {
    if (this.componentRef) return;

    this.componentRef = this.viewContainer.createComponent(this.popoverFactory, 0, this.injector, [this.projectableNodes]);
    this.popover = this.componentRef.instance;
    this.popover.afterViewInit.take(1).subscribe(() => this.tether.position());
    this.setTether(true);

    // To avoid unexpected behavior when template "lives" inside an OnPush
    // component, explicitlly request change detection to run on creation.
    this.popover.changeDetector.markForCheck();
  }

  private get projectableNodes() {
    if (this.chPopover instanceof TemplateRef) {
      const view: EmbeddedViewRef<any> = this.viewContainer.createEmbeddedView(<TemplateRef<any>>this.chPopover);
      return view.rootNodes;
    } else {
      return [this.renderer.createText(null, <string>this.chPopover)];
    }
  }

  private destroy() {
    if (!this.componentRef) return;

    this.tether.destroy();
    this.tether = null;
    this.componentRef.destroy();
    this.componentRef = null;
    this.popover = null;
  }
};
