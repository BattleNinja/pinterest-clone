import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LinkService} from '../../services/link.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newForm: FormGroup;
  links: any[];
  loginStatus: boolean;
  mylikelist: any[];

  constructor(private linkService: LinkService, private authService: AuthService) {
  }

  ngOnInit() {
    this.newForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'link': new FormControl(null, Validators.required)
    });
    this.loginStatus = this.authService.checkLogIn();
    this.getAllLinks();
    this.getLikeList();
  }

  onSave() {
    const item = {
      title: this.newForm.value.title,
      link: this.newForm.value.link
    };
    this.linkService.addLink(item).subscribe(
      res => {
        this.newForm.reset();
        this.links.push(res);
      }
    );
  }

  getAllLinks() {
    this.linkService.getAllLink().subscribe(
      links => this.links = links
    );
  }

// like function =--------
  onLikeClick(index) {
    if (this.checkishasliked(index)) {
      this.onCancelLike(index);
    } else {
      this.onlike(index);
    }

  }

  onlike(index) {
    const likeid = {'linkid': this.links[index]._id};
    this.linkService.onLike(likeid).subscribe(
      (res) => {
        this.links[index].likednumber++;
        this.mylikelist.push(this.links[index]._id);
      }
    );
  }

  onCancelLike(index) {
    const likeid = {'linkid': this.links[index]._id};
    this.linkService.onCancelLike(likeid).subscribe(
      (res) => {
        this.links[index].likednumber--;
        const position = this.mylikelist.indexOf(this.links[index]._id);
        if (position > -1) {
          this.mylikelist.splice(position, 1);
        }

      }
    );
  }

  getLikeList() {
    this.linkService.getLikeList().subscribe(
      res => this.mylikelist = res
    );
  }


  checkishasliked(i) {
    return this.mylikelist.includes(this.links[i]._id);
  }

  handleError(e) {
    e.target.src = 'http://www.404notfound.fr/assets/images/pages/img/13gbdotcom.jpg';
  }
}
