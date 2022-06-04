import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import data from 'src/assets/data.json';
/**
 * @title Plain input autocomplete
 */
@Component({
  selector: 'searchEngine',
  templateUrl: 'searchEngine.html',
  styleUrls: ['searchEngine.css'],
})
export class SearchEngine implements OnInit {
  private phrases: string[] = data;
  control = new FormControl('');
  filteredPhrases: Observable<string[]>;

  ngOnInit() {
    this.filteredPhrases = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.phrases.filter(phrase => this._normalizeValue(phrase).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onClickHandler(value: string){
    window.location.href="https://www.google.com/search?q="+value;
  }
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */