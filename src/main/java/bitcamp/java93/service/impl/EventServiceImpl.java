package bitcamp.java93.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java93.dao.EventDao;
import bitcamp.java93.domain.Category;
import bitcamp.java93.domain.Event;
import bitcamp.java93.service.EventService;

@Service
public class EventServiceImpl implements EventService {
 
  @Autowired
  EventDao eventDao;
  
  public List<Event> listOngoing() throws Exception {   
    return eventDao.selectOngoingList();
  }
  
  public  List<Category> listTheme() throws Exception {   
    return eventDao.selectListTheme();
  }
  
  public  List<Category> listMajor() throws Exception {   
    return eventDao.selectListMajor();
  }
  
  public  List<Category> listGenre() throws Exception {   
    return eventDao.selectListGenre();
  }
  
  public  List<Category> listLocationType() throws Exception {   
    return eventDao.selectListLocationType();
  }
  
  public  List<Category> listLocation(int no) throws Exception {   
    return eventDao.selectListLocation(no);
  }
  
  public  void add(Event event) throws Exception {   
    eventDao.insert(event);
  }
  
  public  void addTheme(Event event) throws Exception {   
    this.insertPhoto(4, event.getCategoryThemeNo());
  }
  
  private void insertPhoto(int eventNo, List<String> categoryThemeNo) {
    if (categoryThemeNo == null)
      return;
    
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("eventNo", eventNo);
    
    for (String eventTheme : categoryThemeNo) {
      valueMap.put("eventTheme", eventTheme);
      eventDao.insertTheme(valueMap);
    }
  }
  
}

