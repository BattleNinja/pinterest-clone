import {Component, OnInit} from '@angular/core';
import {LinkService} from '../../services/link.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  links: any[];


  constructor(private linkService: LinkService) {
  }

  ngOnInit() {
    this.linkService.getMyLink().subscribe(
      res => this.links = res
    );
  }

  onDelete(index) {
    const linkid = this.links[index]._id;
    const item = {'linkid': linkid};
    this.linkService.onDelete(item).subscribe(
      res => {
        this.links.splice(index, 1);
      }
    );
  }


  handleError(e) {
    e.target.src = 'http://www.404notfound.fr/assets/images/pages/img/13gbdotcom.jpg';
  }

}
