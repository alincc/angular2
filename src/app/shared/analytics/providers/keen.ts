import {Injectable} from '@angular/core';
import { environment } from '../../../environment';
import {Angulartics2} from '../core/angulartics2';

declare var KeenAsync: any;

@Injectable()
export class Angulartics2KeenAnalytics {
	private _keen;
	constructor(
		private angulartics2: Angulartics2
  	) {
		this.angulartics2.settings.pageTracking.trackRelativePath = true;

		// Set the default settings for this module
		this.angulartics2.settings.ga = {
			// array of additional account names (only works for analyticsjs)
			additionalAccountNames: [],
			userId: null
		};

		this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path));

		this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

		this.angulartics2.exceptionTrack.subscribe((x: any) => this.exceptionTrack(x));

		this.angulartics2.setUsername.subscribe((x: string) => this.setUsername(x));

		this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

		this.angulartics2.userTimings.subscribe((x: any) => this.userTimings(x));

		if(KeenAsync){
			KeenAsync.ready(() => {
		      // Configure a client instance
		      this._keen = new KeenAsync({
		        projectId: environment.keenProjectId,
		        writeKey: environment.keenwriteKey
		      });
		    });
		}
	    
	}

  	pageTrack(path: string) {
		if (this._keen) {
			this._keen.recordEvent('pageviews',{
				uid: this.angulartics2.settings.ga.userId,
				path:  path
			});
		}
	}

	/**
	 * Track Event in GA
	 * @name eventTrack
	 *
	 * @param {string} action Required 'action' (string) associated with the event
	 * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
	 *
	 * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
	 *
	 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
	 */
  	eventTrack(action: string, properties: any) {
		var eventOptions = {
			category: properties.category,
			action: action,
			label: properties.label,
			value: properties.value,
			nonInteraction: properties.noninteraction,
			page: properties.page || location.hash.substring(1) || location.pathname,
			userId: this.angulartics2.settings.ga.userId
		};

		if (this._keen) {
			this._keen.recordEvent(eventOptions.category,eventOptions);
		}
	}	

	/**
	 * Exception Track Event in GA
	 * @name exceptionTrack
	 *
	 * @param {object} properties Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and 
	 * optional  fields 'fatal' (boolean) and 'description' (string)
	 *
	 * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
	 *
	 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
	 */
	exceptionTrack(properties: any) {
		
	}

	setUsername(userId: string) {
		this.angulartics2.settings.ga.userId = userId;
	}

	setUserProperties(properties: any) {
		this.setDimensionsAndMetrics(properties);
	}

	/**
	 * User Timings Event in GA
	 * @name userTimings
	 *
	 * @param {object} properties Comprised of the mandatory fields:
	 *     'timingCategory' (string),
	 *     'timingVar' (string),
	 *     'timingValue' (number)
	 * Properties can also have the optional fields:
	 *     'timingLabel' (string)
	 *
	 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
	 */
	userTimings(properties: any) {
		
	}

	private setDimensionsAndMetrics(properties: any) {
		
	}
}
