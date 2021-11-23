import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as env } from '@env/environment';

@Component({
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const { slug } = this.route.snapshot.params
    window.location.href = env.apiUrl + '/lives/' + slug
  }

}
