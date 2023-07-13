import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from 'src/app/services/members.service';
import Member from 'src/app/types/interfaces/member';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit {
  member: Member | undefined = undefined;

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.membersService
      .getMember(username)
      .subscribe({ next: (member) => (this.member = member) });
  }
}
