import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { MembersService } from 'src/app/services/members.service';
import Member from 'src/app/types/interfaces/member';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit {
  member: Member | undefined = undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
  }

  getImages() {
    if (!this.member) return [];

    const imgUrls: NgxGalleryImage[] = [];

    for (const photo of this.member.photos) {
      imgUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      });
    }

    return imgUrls;
  }

  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.membersService
      .getMember(username)
      .subscribe({
        next: (member) => (this.member = member),
        complete: () => (this.galleryImages = this.getImages()),
      });
  }
}
