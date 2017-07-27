package bitcamp.java93.service;

import java.util.List;

import bitcamp.java93.domain.Category;
import bitcamp.java93.domain.Event;

public interface EventService {
  List<Event> listOngoing() throws Exception;
  List<Category> listTheme() throws Exception;
}
