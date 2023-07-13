import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import Member from 'src/app/types/interfaces/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe({
      next: (res) => (this.members = res),
      complete: () => console.log(this.members),
    });
  }
}
