import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
// import ARTICLES_QUERY from '../apollo/queries/article/articles';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  data: any[] = [];
  loading = true;
  errors: any;
  leftArticlesCount: any;
  leftArticles: any[] = [];
  rightArticles: any[] = [];

  private queryArticles: Subscription = new Subscription();

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    const ARTICLES_QUERY = gql`
      query Contents {
        contents {
          id
          IsPublished
          CoverImage {
            id
            url
          }
          Description
        }
      }
    `;

    this.queryArticles = this.apollo
      .watchQuery({
        query: ARTICLES_QUERY,
      })
      .valueChanges.subscribe((result) => {
        console.log(JSON.stringify(result));
        const test: any = result.data;
        this.data = test.contents;
        console.log(JSON.stringify(this.data));
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy() {
    this.queryArticles.unsubscribe();
  }
}
