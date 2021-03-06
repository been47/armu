package bitcamp.java93.domain;

import java.util.ArrayList;
import java.util.List;

public class Event {
  int no;
  String title;
  int writer;
  Member writeMember;
  Musician matchMusician;
  ArrayList<String> themeList;
  ArrayList<String> majorList;
  ArrayList<String> genreList;
  ArrayList<Integer> themeNoList;
  ArrayList<Integer> majorNoList;
  ArrayList<Integer> genreNoList;
  String city;
  String location;
  String address;
  int pay;
  int locno;
  int loctno;
  String requirement;
  String contents;
  int downPay;
  int tmnno;
  String date;
  int rhspay;
  int rhsnum;
  int score;
  int isReview;
  String rev;
  int pr_count;
  int mtc_info;
  int mtcno;
  String rhsinfo;
  boolean haveRehearsal;
  int appyno;
  char eventActive;
  char prStatus;
  char appyStatus;
  char prActive;
  char appyActive;
  int muno;
  boolean isFavorite;
  List<String> EventRegistTheme;
  List<String> EventRegistMajor;
  List<String> EventRegistGenre;
  ArrayList<Musician> appyList;
  ArrayList<Musician> prList;
  @Override
  public String toString() {
    return "Event [no=" + no + ", title=" + title + ", writer=" + writer + ", writeMember=" + writeMember
        + ", matchMusician=" + matchMusician + ", themeList=" + themeList + ", majorList=" + majorList + ", genreList="
        + genreList + ", themeNoList=" + themeNoList + ", majorNoList=" + majorNoList + ", genreNoList=" + genreNoList
        + ", city=" + city + ", location=" + location + ", address=" + address + ", pay=" + pay + ", locno=" + locno
        + ", loctno=" + loctno + ", requirement=" + requirement + ", contents=" + contents + ", downPay=" + downPay
        + ", tmnno=" + tmnno + ", date=" + date + ", rhspay=" + rhspay + ", rhsnum=" + rhsnum + ", score=" + score
        + ", isReview=" + isReview + ", rev=" + rev + ", pr_count=" + pr_count + ", mtc_info=" + mtc_info + ", mtcno="
        + mtcno + ", rhsinfo=" + rhsinfo + ", haveRehearsal=" + haveRehearsal + ", appyno=" + appyno + ", eventActive="
        + eventActive + ", prStatus=" + prStatus + ", appyStatus=" + appyStatus + ", prActive=" + prActive
        + ", appyActive=" + appyActive + ", muno=" + muno + ", isFavorite=" + isFavorite + ", EventRegistTheme="
        + EventRegistTheme + ", EventRegistMajor=" + EventRegistMajor + ", EventRegistGenre=" + EventRegistGenre
        + ", appyList=" + appyList + ", prList=" + prList + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
        + ", toString()=" + super.toString() + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public int getWriter() {
    return writer;
  }
  public void setWriter(int writer) {
    this.writer = writer;
  }
  public Member getWriteMember() {
    return writeMember;
  }
  public void setWriteMember(Member writeMember) {
    this.writeMember = writeMember;
  }
  public Musician getMatchMusician() {
    return matchMusician;
  }
  public void setMatchMusician(Musician matchMusician) {
    this.matchMusician = matchMusician;
  }
  public ArrayList<String> getThemeList() {
    return themeList;
  }
  public void setThemeList(ArrayList<String> themeList) {
    this.themeList = themeList;
  }
  public ArrayList<String> getMajorList() {
    return majorList;
  }
  public void setMajorList(ArrayList<String> majorList) {
    this.majorList = majorList;
  }
  public ArrayList<String> getGenreList() {
    return genreList;
  }
  public void setGenreList(ArrayList<String> genreList) {
    this.genreList = genreList;
  }
  public ArrayList<Integer> getThemeNoList() {
    return themeNoList;
  }
  public void setThemeNoList(ArrayList<Integer> themeNoList) {
    this.themeNoList = themeNoList;
  }
  public ArrayList<Integer> getMajorNoList() {
    return majorNoList;
  }
  public void setMajorNoList(ArrayList<Integer> majorNoList) {
    this.majorNoList = majorNoList;
  }
  public ArrayList<Integer> getGenreNoList() {
    return genreNoList;
  }
  public void setGenreNoList(ArrayList<Integer> genreNoList) {
    this.genreNoList = genreNoList;
  }
  public String getCity() {
    return city;
  }
  public void setCity(String city) {
    this.city = city;
  }
  public String getLocation() {
    return location;
  }
  public void setLocation(String location) {
    this.location = location;
  }
  public String getAddress() {
    return address;
  }
  public void setAddress(String address) {
    this.address = address;
  }
  public int getPay() {
    return pay;
  }
  public void setPay(int pay) {
    this.pay = pay;
  }
  public int getLocno() {
    return locno;
  }
  public void setLocno(int locno) {
    this.locno = locno;
  }
  public int getLoctno() {
    return loctno;
  }
  public void setLoctno(int loctno) {
    this.loctno = loctno;
  }
  public String getRequirement() {
    return requirement;
  }
  public void setRequirement(String requirement) {
    this.requirement = requirement;
  }
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }
  public int getDownPay() {
    return downPay;
  }
  public void setDownPay(int downPay) {
    this.downPay = downPay;
  }
  public int getTmnno() {
    return tmnno;
  }
  public void setTmnno(int tmnno) {
    this.tmnno = tmnno;
  }
  public String getDate() {
    return date;
  }
  public void setDate(String date) {
    this.date = date;
  }
  public int getRhspay() {
    return rhspay;
  }
  public void setRhspay(int rhspay) {
    this.rhspay = rhspay;
  }
  public int getRhsnum() {
    return rhsnum;
  }
  public void setRhsnum(int rhsnum) {
    this.rhsnum = rhsnum;
  }
  public int getScore() {
    return score;
  }
  public void setScore(int score) {
    this.score = score;
  }
  public int getIsReview() {
    return isReview;
  }
  public void setIsReview(int isReview) {
    this.isReview = isReview;
  }
  public String getRev() {
    return rev;
  }
  public void setRev(String rev) {
    this.rev = rev;
  }
  public int getPr_count() {
    return pr_count;
  }
  public void setPr_count(int pr_count) {
    this.pr_count = pr_count;
  }
  public int getMtc_info() {
    return mtc_info;
  }
  public void setMtc_info(int mtc_info) {
    this.mtc_info = mtc_info;
  }
  public int getMtcno() {
    return mtcno;
  }
  public void setMtcno(int mtcno) {
    this.mtcno = mtcno;
  }
  public String getRhsinfo() {
    return rhsinfo;
  }
  public void setRhsinfo(String rhsinfo) {
    this.rhsinfo = rhsinfo;
  }
  public boolean isHaveRehearsal() {
    return haveRehearsal;
  }
  public void setHaveRehearsal(boolean haveRehearsal) {
    this.haveRehearsal = haveRehearsal;
  }
  public int getAppyno() {
    return appyno;
  }
  public void setAppyno(int appyno) {
    this.appyno = appyno;
  }
  public char getEventActive() {
    return eventActive;
  }
  public void setEventActive(char eventActive) {
    this.eventActive = eventActive;
  }
  public char getPrStatus() {
    return prStatus;
  }
  public void setPrStatus(char prStatus) {
    this.prStatus = prStatus;
  }
  public char getAppyStatus() {
    return appyStatus;
  }
  public void setAppyStatus(char appyStatus) {
    this.appyStatus = appyStatus;
  }
  public char getPrActive() {
    return prActive;
  }
  public void setPrActive(char prActive) {
    this.prActive = prActive;
  }
  public char getAppyActive() {
    return appyActive;
  }
  public void setAppyActive(char appyActive) {
    this.appyActive = appyActive;
  }
  public int getMuno() {
    return muno;
  }
  public void setMuno(int muno) {
    this.muno = muno;
  }
  public boolean isFavorite() {
    return isFavorite;
  }
  public void setFavorite(boolean isFavorite) {
    this.isFavorite = isFavorite;
  }
  public List<String> getEventRegistTheme() {
    return EventRegistTheme;
  }
  public void setEventRegistTheme(List<String> eventRegistTheme) {
    EventRegistTheme = eventRegistTheme;
  }
  public List<String> getEventRegistMajor() {
    return EventRegistMajor;
  }
  public void setEventRegistMajor(List<String> eventRegistMajor) {
    EventRegistMajor = eventRegistMajor;
  }
  public List<String> getEventRegistGenre() {
    return EventRegistGenre;
  }
  public void setEventRegistGenre(List<String> eventRegistGenre) {
    EventRegistGenre = eventRegistGenre;
  }
  public ArrayList<Musician> getAppyList() {
    return appyList;
  }
  public void setAppyList(ArrayList<Musician> appyList) {
    this.appyList = appyList;
  }
  public ArrayList<Musician> getPrList() {
    return prList;
  }
  public void setPrList(ArrayList<Musician> prList) {
    this.prList = prList;
  }
  
}
