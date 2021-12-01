import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as env } from '@env/environment';

@Component({
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const { slug } = this.route.snapshot.params
    window.location.href = env.apiUrl + '/photos/' + slug
  }

}
