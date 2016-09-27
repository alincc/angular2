import {
	Component,
	forwardRef,
	Input
} from "@angular/core";

import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR
} from "@angular/forms";

const CUSTOM_VALUE_ACCESSOR = {
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};

const noop = () => {
};

@Component({

  selector: 'ch-tag-input',
  templateUrl: './tag-input.component.html',
  styles: [
  	require('./tag-input.component.scss')
  ],
  providers: [
  	CUSTOM_VALUE_ACCESSOR
  ]
})
export class TagInputComponent implements ControlValueAccessor {
  opened: boolean = false;
  size: string;
	//Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  tags:string[] = [];
  selectedItem:string;
  @Input() placeholder:string;
  @Input() label:string;

	constructor() { }

	ngOnInit() {

	}

  openTagModal(size: string) {
    this.size = size;
    this.opened = !this.opened;
  }

  cancel() {
    this.opened = false;
  }

	//From ControlValueAccessor interface
  writeValue(tags: string[]) {
  	console.log(tags);
      if(tags)
	    this.tags = tags;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn) {
	  this._onChangeCallback = fn;
  }

  onPickChange($event){
  	this.tags.push($event);
  	this.selectedItem = null;
    this._onChangeCallback(this.tags);
  }

  onValueChange($event){
  	console.log($event);
  }

  remove(tag:string) {
  	this.tags = this.tags.filter(_pill => _pill !== tag);
    this._onChangeCallback(this.tags);
	}

  //From ControlValueAccessor interface
  registerOnTouched(fn) {
     this._onTouchedCallback = fn;
  }

  speciality = [
    "General Surgery", "Urology", "Trauma & Orthopaedics", "Ent","Ophthalmology", "Oral Surgery", "Restorative Dentistry", "Paediatric Dentistry", "Orthodontics","Oral & Maxillo Facial Surgery", "Endodontics", "Periodontics", "Prosthodontics", "Surgical Dentistry","Prosthodontics","Surgical Dentistry","Neurosurgery","Plastic Surgery","Cardiothoracic Surgery","Paediatric Surgery","Accident & Emergency ","Anaesthetics","Critical Care Medicine","General Medicine","Gastroenterology","Endocrinology","Clinical Haematology","Clinical Physiology","Clinical Pharmacology","Audiological Medicine","Clinical Genetics","Clinical Immunology And Allergy","Rehabilitation","Palliative Medicine","Cardiology","Paediatric Cardiology","Sport And Exercise Medicine","Acute Internal Medicine","Dermatology","Respiratory Medicine (also Known As Thoracic Medicine)","Infectious Diseases","Tropical Medicine","Genitourinary Medicine","Nephrology","Medical Oncology","Nuclear Medicine","Neurology","Clinical Neuro-physiology","Rheumatology","Paediatrics","Paediatric Neurology","Geriatric Medicine","Dental Medicine Specialties","Special Care Dentistry","Medical Ophthalmology","Obstetrics","Gynaecology","Community Sexual And Reproductive Health","Midwife Episode","General Medical Practice","General Dental Practice","Learning Disability","Adult Mental Illness","Child And Adolescent Psychiatry","Forensic Psychiatry","Psychotherapy","Old Age Psychiatry","Clinical Oncology (previously Radiotherapy)","Radiology","General Pathology","Blood Transfusion","Chemical Pathology","Haematology","Histopathology","Immunopathology","Medical Microbiology And Virology","Medical Virology","Community Medicine","Occupational Medicine","Community Health Services Dental","Public Health Medicine","Public Health Dental","Nursing Episode","Allied Health Professional Episode"
  ];

  lookup = (query: string, source:any): string[] => {
  	source = this.speciality;
    if (!query) {
      return null;
    }
    return source.filter((d: string) => d.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

}
