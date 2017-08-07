package bitcamp.java93.dao;

import java.util.List;
import java.util.Map;

import bitcamp.java93.domain.Event;

public interface EventDao {
  List<Event> selectOngoingList();
  int insert(Event event);
  int insertTheme(Map<String,Object> themeMap);
  int insertMajor(Map<String,Object> majorMap);
  int insertGenre(Map<String,Object> genreMap);
  int insertReherse(Event event);
  List<Event> selectRecommandList(int no);//뮤지션모드 > 추천탭 > 나에게 꼭 맞는 이벤트 리스트
  List<Event> selectRecentList(int no);//뮤지션모드 > 추천탭 > 최근 이벤트 리스트 (파라미터 받는 이유는 관심 이벤트 정보 가져오려고)
  List<Event> selectEventList(int no);
  void eventRequest(Map<String,Object> valueMap);
}
