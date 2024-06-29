import { Component, Input, OnInit } from '@angular/core';
import { ColorConfig } from '../../color-config';

@Component({
  selector: 'app-header-info-card',
  templateUrl: './header-info-card.component.html',
  styleUrls: ['./header-info-card.component.css']
})
export class HeaderInfoCardComponent implements OnInit {

  @Input() isPrimary: boolean = true;
  @Input() cardLabel: string = "";
  @Input() cardValue: string = "20";
  @Input() cardIconSrc: string = "https://img.icons8.com/3d-fluency/94/user-group-man-woman--v2.png";

  primaryColor = ColorConfig.primaryColor;
  secondaryColor = ColorConfig.secondaryColor;
  bgColor = ColorConfig.bgColor;
  bgDarkColor = ColorConfig.bgDarkColor;


  constructor() { }

  ngOnInit(): void {
  }

}
