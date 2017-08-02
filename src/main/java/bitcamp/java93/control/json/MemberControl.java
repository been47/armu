package bitcamp.java93.control.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java93.domain.Member;
import bitcamp.java93.service.MemberService;

@RestController
@RequestMapping("/member/")
public class MemberControl {
  
  @Autowired ServletContext servletContext;
  @Autowired MemberService memberService;
  
  @RequestMapping("add")
  public JsonResult add(Member member) throws Exception {
    
    System.out.println(member);
    
    JsonResult result = new JsonResult();
    
    try {
      memberService.add(member);

      return new JsonResult(JsonResult.SUCCESS, "ok");
       
    } catch (Exception e) {
      result.setStatus(JsonResult.ERROR);
    }
    
    return result;
  }
  
  @RequestMapping("getProfile")
  public JsonResult getProfile(HttpSession session){

    JsonResult result = new JsonResult();
    Member loginMember = (Member)session.getAttribute("loginMember");

    if(loginMember != null) {
      try {
        Member memberProfile = memberService.getProfile(loginMember);

        //       if(musicianList == null) {
        //         result.setStatus(JsonResult.FAIL);
        //       } else {
        //       }

        result.setStatus(JsonResult.SUCCESS);

        HashMap<String,Object> dataMap = new HashMap<>();
        dataMap.put("profile", memberProfile);

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
   
  @RequestMapping("update")
  public JsonResult update(Member member) throws Exception {
    memberService.updateNick(member);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("updatePhoto")
  public JsonResult updatePhoto(@RequestParam int no,MultipartFile[] files) throws Exception {

    ArrayList<Object> fileList = new ArrayList<>();
    for (int i = 0; i < files.length; i++) {
      if (files[i].isEmpty()) 
        continue;

      String filename = getNewFilename();
      memberService.updatePhoto(no ,filename);
      File file =new File(servletContext.getRealPath("/image/musician/photo/" + filename));
      System.out.println(file);
      files[i].transferTo(file);
      fileList.add(filename);
    }
    return new JsonResult(JsonResult.SUCCESS, fileList);
  }

  int count = 0;
  synchronized private String getNewFilename() {
    if (count > 100) {
      count = 0;
    }
    return String.format("%d_%d", System.currentTimeMillis(), ++count); 
  }
}









