import { Component } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const USERS_QUERY = gql`
  query {
  users {
    email
    name
  }
}
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Graphql Client in Angular';
  users: any[] = [];

  private query: QueryRef<any>;
  constructor(private apollo: Apollo){}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: USERS_QUERY
    });

    this.query.valueChanges.subscribe(result => {
      this.users = result.data && result.data.users;
      console.log(JSON.stringify(this.users));
    });
  }

}
