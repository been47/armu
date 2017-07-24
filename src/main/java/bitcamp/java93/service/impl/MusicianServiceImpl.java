package bitcamp.java93.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java93.dao.MemberDao;
import bitcamp.java93.dao.MusicianDao;
import bitcamp.java93.domain.Musician;
import bitcamp.java93.service.MusicianService;

@Service
public class MusicianServiceImpl implements MusicianService {
  @Autowired
  MemberDao memberDao;
  
  @Autowired
  MusicianDao musicianDao;
  
  public List<Musician> listRecommand() throws Exception {   
    return musicianDao.selectRecommandList();
  }
  
//  private void listMajor() {
//      musicianDao.selectMajorList(no)
//  }
  
  
}






