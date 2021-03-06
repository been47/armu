package bitcamp.java93.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java93.dao.MemberDao;
import bitcamp.java93.domain.Member;
import bitcamp.java93.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
  @Autowired
  MemberDao memberDao;

  
  public void add(Member member) throws Exception {
    memberDao.insert(member);
  }

  public Member getByEmailPassword(String email, String password) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("email", email);
    valueMap.put("password", password);
    
    return memberDao.selectOneByEmailPassword(valueMap);
  }

  @Override
  public Member getProfile(Member member) throws Exception {
    return memberDao.selectOne(member); 
  }
  public Member getProfile2(Member member) throws Exception {
    return memberDao.selectMusi(member); 
  }
   
  public void updatePwd(Member member) throws Exception {
    memberDao.updatePwd(member);
  }
  
  
  @Override
  public void updatePhoto(int no, String photoPath) throws Exception {

    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("memberNo", no);
    valueMap.put("photoPath", photoPath);
    System.out.println(photoPath);
    memberDao.updatePhoto(valueMap);
  }
  
  public void remove(int no) throws Exception {
    int count = memberDao.delete(no);
    if (count < 1) {
      throw new Exception("회원 정보가 없습니다.");
    }
  }
  
}







