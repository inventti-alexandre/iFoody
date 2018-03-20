import { imageDefault } from "./../../../constant/global";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { SearchService } from "./../../../shared/services/search.service";
import { UserService } from "../../../shared/services/user.service";
declare var searchObject: any;

@Component({
  selector: "search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"],
  providers: [SearchService, UserService]
})
export class SearchBarComponent implements OnInit {
  @Input("searchString") searchString;
  @Input("area") area;

  districts: any[];
  suggestionList: any[];
  userId: string;
  defaultSuggestionCount;
  defaultPageResult;
  imageDefault: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _searchService: SearchService,
    private _userService: UserService
  ) {
    this.searchString = "";
    this.districts = [
      "Bình Thạnh",
      "Tân Bình",
      "Phú Nhuận",
      "Tân Phú",
      "Gò Vấp",
      "Bình Tân",
      "Thủ Đức",
      "Bình Chánh",
      "Nhà Bè",
      "Hóc Môn",
      "Củ Chi",
      "Cần Giờ"
    ];
    this.suggestionList = [];
    this.userId = _userService.userId || "";
    this.defaultSuggestionCount = 5;
    this.defaultPageResult = 1;
    this.imageDefault = imageDefault;
  }
  getSuggestionList = () => {
    if (this.userId !== "") {
      this.getSuggestionListByUserId(this.userId, this.defaultSuggestionCount);
    } else {
      this.getSuggestionListByRating(this.defaultSuggestionCount);
    }
  };
  getSuggestionListByRating = (count?) => {
    return this._searchService
      .SuggestListByRating(count)
      .subscribe((data: Response) => {
        if (data !== null) {
          this.suggestionList.push(data);
          console.log("suggest result", this.suggestionList[0].results);
        } else {
          console.log("suggest result empty");
        }
      });
  };
  getSuggestionListByUserId = (userId, count?) => {
    return this._searchService
      .SuggestListByUserId(userId, count)
      .subscribe((data: Response) => {
        if (data !== null) {
          this.suggestionList.push(data);
          console.log("suggest result", this.suggestionList[0].results);
        } else {
          console.log("suggest result empty");
        }
      });
  };
  checkOpenStore = (openHour, closeHour) => {
    let openHourConvert = openHour.split(":");
    let openTimeSeconds =
      +openHourConvert[0] * 60 * 60 + +openHourConvert[1] * 60;

    let closeHourConvert = closeHour.split(":");
    let closeTimeSeconds =
      +closeHourConvert[0] * 60 * 60 + +closeHourConvert[1] * 60;

    let currentTime = new Date();
    let currentSeconds =
      currentTime.getHours() * 60 * 60 + currentTime.getMinutes() * 60;

    let isOpen = false;
    if (currentSeconds > openTimeSeconds && currentSeconds < closeTimeSeconds) {
      isOpen = true;
    }
    // console.log(currentSeconds - openTimeSeconds);

    return isOpen;
  };
  getSearchPaging(searchString, initPage) {
    return this._searchService
      .SearchPaging(
        searchString.replace(/['"]+/g, ""),
        initPage,
        this.defaultSuggestionCount
      )
      .subscribe((data: Response) => {
        if (data !== null) {
          this.suggestionList.splice(0,1,data);
          console.log("search paging result", this.suggestionList, data);
        } else {
          this.suggestionList = null;
          console.log("search paging result empty", this.suggestionList);
        }
      });
  }

  ngOnInit() {
    searchObject.hide();
    // this.getSuggestionListByRating(5);
    // this.getSuggestionListByUserId("cc736f75-4b3f-457b-9110-2272455e282d");
  }

  public setSearchQueryParam() {
    this.router.navigate(["/search"], {
      queryParams: { name: this.searchString, area: this.area }
    });
  }
}
