import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()

export class LinkService {
  myLinks: object[];
  likedLinks: string[];

  constructor(private http: Http, private authService: AuthService) {
  }

  addLink(item) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const url = 'http://localhost:3000/process/addlink';
    return this.http.post(url, item, {headers: headers}).map(
      res => res.json()
    );
  }

  getMyLink() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const url = 'http://localhost:3000/process/mylink';
    return this.http.get(url, {headers: headers}).map(
      (res) => {
        return res.json();
      }
    );
  }

  onDelete(linkid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const url = 'http://localhost:3000/process/deletlink';
    return this.http.post(url, linkid, {headers: headers});
  }

  getAllLink() {
    const url = 'http://localhost:3000/process/alllink';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers}).map(
      res => res.json()
    );
  }

  onLike(linkid) {
    const url = 'http://localhost:3000/process/like';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post(url, linkid, {headers: headers});
  }

  onCancelLike(linkid) {
    const url = 'http://localhost:3000/process/unlike';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.post(url, linkid, {headers: headers});
  }

  getLikeList() {
    const url = 'http://localhost:3000/process/mylike';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    return this.http.get(url, {headers: headers}).map(
      res => res.json()
    );
  }
}
