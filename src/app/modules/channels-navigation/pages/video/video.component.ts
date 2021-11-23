import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as env} from '@env/environment';
@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    const { slug } = this.route.snapshot.params
    window.location.href = env.apiUrl + '/videos/' + slug
  }

}
