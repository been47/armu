package bitcamp.java93.control.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java93.domain.Member;
import bitcamp.java93.domain.Musician;
import bitcamp.java93.service.MusicianService;

@RestController
@RequestMapping("/musician/")
public class MusicianControl {

  @Autowired ServletContext servletContext;
  @Autowired MusicianService musicianService;

  @RequestMapping("listRecommand")
  public JsonResult list(HttpSession session) {

    JsonResult result = new JsonResult();
    Member loginMember = (Member)session.getAttribute("loginMember");

    if(loginMember != null) {
      try {
        List<Musician> musicianList = musicianService.listRecommand(loginMember);

        //       if(musicianList == null) {
        //         result.setStatus(JsonResult.FAIL);
        //       } else {
        //       }

        result.setStatus(JsonResult.SUCCESS);

        HashMap<String,Object> dataMap = new HashMap<>();
        dataMap.put("listRecommand", musicianList);
        result.setData(dataMap);

      } catch (Exception e) {
        result.setStatus(JsonResult.ERROR);
      }
    } else {//loginMember가 없으면
      result.setStatus(JsonResult.SUCCESS);
      result.setData("browse");
    }

    return result;
  }
  
  @RequestMapping("listFavor")
  public JsonResult listFavor(HttpSession session) throws Exception {
    Member loginMember = (Member)session.getAttribute("loginMember");
    HashMap<String,Object> dataMap = new HashMap<>();
    ArrayList<Musician> musicianListFavor = (ArrayList<Musician>) musicianService.listFavor(loginMember.getNo());
    Musician musicianFavorCount = musicianService.favorCount(loginMember.getNo());
    dataMap.put("listFavor", musicianListFavor);
    dataMap.put("favorCount", musicianFavorCount);
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("favorRemove")
  public JsonResult favorRemove(HttpSession session, int no) throws Exception {
    Member loginMember = (Member)session.getAttribute("loginMember");
     musicianService.favorRemove(loginMember.getNo(), no);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("favorAdd")
  public JsonResult favorAdd(HttpSession session, int no) throws Exception {
    Member loginMember = (Member)session.getAttribute("loginMember");
     musicianService.favorAdd(loginMember.getNo(), no);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }

  @RequestMapping("listSurf")
  public JsonResult listSurf(HttpSession session) throws Exception {
    JsonResult result = new JsonResult();
    
    try {
      List<Musician> listSurf = (List<Musician>) musicianService.listSurf(getLoginMember(session).getNo());
      HashMap<String,Object> dataMap = new HashMap<>();
      dataMap.put("listSurf", listSurf);
      result.setData(dataMap);
    } catch (Exception e) {
      result.setStatus(JsonResult.ERROR);
      result.setData(e.getMessage());
    }
    return result;
  }
  
  @RequestMapping("listSurfFilter")
  public JsonResult listSurfFilter(int minAge, int maxAge) throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
      List<Musician> musicianFilterList = (List<Musician>) musicianService.listSurfFilter(minAge, maxAge);
      dataMap.put("listSurf", musicianFilterList);
      return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("listSurfGenderFilter")
  public JsonResult listSurfGenderFilter(String gender, int minAge, int maxAge) throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
      List<Musician> musicianGenderList = (List<Musician>) musicianService.listSurfGenderFilter(gender, minAge, maxAge);
      dataMap.put("listSurf", musicianGenderList);
      return new JsonResult(JsonResult.SUCCESS, dataMap);
    }
  
//  @RequestMapping("getProfile")
//  public JsonResult getProfile(HttpSession session){
//
//    JsonResult result = new JsonResult();
//    Member loginMember = (Member)session.getAttribute("loginMember");
//
//    if(loginMember != null) {
//      try {
//        Musician musicianProfile = musicianService.getProfile(loginMember);
//
//        //       if(musicianList == null) {
//        //         result.setStatus(JsonResult.FAIL);
//        //       } else {
//        //       }
//
//        result.setStatus(JsonResult.SUCCESS);
//
//        HashMap<String,Object> dataMap = new HashMap<>();
//        dataMap.put("profile", musicianProfile);
//
//        result.setData(dataMap);
//      } catch (Exception e) {
//        result.setStatus(JsonResult.ERROR);
//      }
//    } else {//loginMember가 없으면
//      result.setStatus(JsonResult.SUCCESS);
//      result.setData("browse");
//    }
//
//    return result;
//
//  }
  
  @RequestMapping("musiInfo")
  public JsonResult musiInfo(HttpSession session, int no) throws Exception {
    
    Member loginMember = (Member)session.getAttribute("loginMember");
    HashMap<String,Object> dataMap = new HashMap<>();

    Musician musician = musicianService.get(loginMember.getNo(), no);
    
    dataMap.put("musician", musician);
    
      return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("musiInfoReview")
  public JsonResult musiInfoReview(int no) {
    JsonResult result = new JsonResult();
    
    try {
      List<Musician> musicianReview = (List<Musician>) musicianService.listReview(no);
      HashMap<String,Object> dataMap = new HashMap<>();
      dataMap.put("musicianReview", musicianReview);
      
      result.setData(dataMap);
      
    } catch (Exception e) {
      result.setStatus(JsonResult.ERROR);
      result.setData(e.getMessage());
    }
    return result;
  }
  
  @RequestMapping("musiInfoReviewIntroduce")
  public JsonResult musiInfoReviewIntroduce(int no) throws Exception {
    
    JsonResult result = new JsonResult();
    HashMap<String,Object> dataMap = new HashMap<>();
    

      Musician musicianIntroduce = musicianService.getIntroduce(no);
      
      if (musicianIntroduce == null) {
        return new JsonResult(JsonResult.SUCCESS, "0");
      }
      
      result.setStatus(JsonResult.SUCCESS);
      dataMap.put("getIntroduce", musicianIntroduce);
      
      result.setData(dataMap);
    return result;
  }
  
  @RequestMapping("musiInfoReviewPortfolio")
  public JsonResult musiInfoReviewPortfolio(int no) throws Exception {
    
    JsonResult result = new JsonResult();
    HashMap<String,Object> dataMap = new HashMap<>();
    

      Musician musicianPortfolio = musicianService.getPortfolio(no);
      
      if (musicianPortfolio == null) {
        return new JsonResult(JsonResult.SUCCESS, "0");
      }
      
      result.setStatus(JsonResult.SUCCESS);
      dataMap.put("getPortfolio", musicianPortfolio);
      
      result.setData(dataMap);
    return result;
  }
  
  @RequestMapping("listLocation")
  public JsonResult listLocation() throws Exception {

    HashMap<String,Object> dataMap = new HashMap<>();

    dataMap.put("location", musicianService.listLocation());

    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  
  

  @RequestMapping("searchMusician")
  public JsonResult searchMusician(@RequestParam String location) throws Exception {

    HashMap<String,Object> dataMap = new HashMap<>();
    List<Musician> searchMusician = (List<Musician>)musicianService.search(location);
    dataMap.put("search", searchMusician);
    return new JsonResult(JsonResult.SUCCESS, dataMap);
    
//      
//    HashMap<String,Object> dataMap = new HashMap<>();
//    ArrayList<Musician> musicianList = (ArrayList<Musician>) musicianService.search(location);
//
//    dataMap.put("search", musicianList);
//    return new JsonResult(JsonResult.SUCCESS, dataMap);
//
//    HashMap<String,Object> dataMap = new HashMap<>();
//
//    dataMap.put("search", musicianService.search(loc));
//
//    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  

  //  @RequestMapping("update")
  //  public JsonResult update(Musician musician, String photo) throws Exception {
  //    System.out.println(musician);
  //    musicianService.updatePhoto(musician, musician.getPhoto());
  //    return new JsonResult(JsonResult.SUCCESS, "ok");
  //  }

//  @RequestMapping("update")
//  public JsonResult updatePhoto(@RequestParam int no,MultipartFile[] files) throws Exception {
//
//    ArrayList<Object> fileList = new ArrayList<>();
//    for (int i = 0; i < files.length; i++) {
//      if (files[i].isEmpty()) 
//        continue;
//
//      String filename = getNewFilename();
//      musicianService.updatePhoto(no ,filename);
//      File file =new File(servletContext.getRealPath("/image/musician/photo/" + filename));
//      System.out.println(file);
//      files[i].transferTo(file);
//      fileList.add(filename);
//    }
//    return new JsonResult(JsonResult.SUCCESS, fileList);
//  }
//
//  int count = 0;
//  synchronized private String getNewFilename() {
//    if (count > 100) {
//      count = 0;
//    }
//    return String.format("%d_%d", System.currentTimeMillis(), ++count); 
//  }
  
  
  private Member getLoginMember(HttpSession session) {
    Member loginMember = (Member) session.getAttribute("loginMember");
      return loginMember;
  }
 
}









