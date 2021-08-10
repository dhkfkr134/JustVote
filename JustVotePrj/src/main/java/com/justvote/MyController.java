package com.justvote;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.swing.filechooser.FileSystemView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.justvote.dao.ICommentDao;
import com.justvote.dao.IRegisterDao;
import com.justvote.dao.IVotePageDao;
import com.justvote.dto.CommentDto;
import com.justvote.dto.RegisterDto;
import com.justvote.dto.VotePageDto;

	

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MyController {
	
	@Autowired
	IRegisterDao dao;
	@Autowired
	ICommentDao dao1;
	@Autowired
	IVotePageDao dao2;
	
	
	HttpSession loginId;


	@RequestMapping("/")
	public String root() throws Exception {

		return "";

	}

	@PostMapping("/register")
	public String write(@RequestBody RegisterDto registerDto) {
		dao.registerDao(registerDto.getUserName(), registerDto.getSex(), registerDto.getAge(), registerDto.getMajor(),
				registerDto.getGrade(), registerDto.getNickName(), registerDto.getUserId(), registerDto.getUserPass());

		return registerDto.toString();

	}
	@PostMapping("/signin")
	public String login(@RequestBody RegisterDto loginDto , HttpServletRequest req ) {
		String check = dao.loginDao(loginDto.getUserId(), loginDto.getUserPass());
		
		
	if(check == null)
	{	
		System.out.println("데이터가 없습니다");
	
		org.apache.tomcat.jni.Error.osError();
	
	}
	else
	{	
		
		System.out.println("성공");
		 loginId = req.getSession();
		 loginId.setAttribute("userId", loginDto.getUserId());
		
	
	}
		return loginDto.toString(); 
		
	}
	@PostMapping("/logout")
	public Object logout(HttpServletRequest req) {
		
		loginId.setAttribute("userId", null);
		
		
		Object a= loginId.getAttribute("userId");
		
		
		return a;
	}
	

	/*
	 * @GetMapping("/getInfo") public RegisterDto getInfo(@PathVariable("userId")
	 * String userId) { RegisterDto checkDto = dao.check(userId);
	 * 
	 * 
	 * return checkDto;
	 * 
	 * }
	 */
	@GetMapping("/getInfo")
	public Object getInfo() {
		/*
		 * //dao.check(checkDto.getUserId()); String userId =
		 * req.getParameter("userId"); HttpSession session =req.getSession();
		 * session.setAttribute("userId",userId); System.out.println(userId); session =
		 * dao.check(checkDto.getUserId());
		 * 
		 * System.out.println(dao.check(checkDto.getUserId()));
		 */
		Object a = loginId.getAttribute("userId");

		if (loginId.getAttribute("userId") == null) {
			System.out.println("데이터가 없습니다");

			org.apache.tomcat.jni.Error.osError();

		} else {
			System.out.println("성공33");

		}

		return a;

	}
	
	/*
	 * @GetMapping("/justvote") public String test(HttpServletRequest req) {
	 * 
	 * 
	 * String id = request.getParameter("id");
	 * 
	 * //dao.contentDao(che.getId()); System.out.println(id); dao.contentDao(id);
	 * 
	 * return id; }
	 */
	
	  @GetMapping("rank") 
	  public List<RegisterDto> rank(RegisterDto rankDto) { 
	  dao.hitView(rankDto.getHit(),rankDto.getUserId());
	 System.out.println("asdfdfdfdfdfdfdfdf"+dao.hitView(rankDto.getHit(),rankDto.getUserId()));
		  return dao.hitView(rankDto.getHit(),rankDto.getUserId());
	  }
	 
	@PostMapping("/registerComment")
	public Object writeComment(@RequestBody CommentDto cd) {
		//dao1.listDao();
		dao1.writeDao(cd.getComment());
		//dao1.delete(cd.getCommentNum());
	Object a = loginId.getAttribute("userId");
	
	return cd.toString();
		
	}
	@PostMapping("/imgRegister")
	public String fileUpLoad(@RequestParam MultipartFile file) throws Exception{
		 String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
		    String basePath = rootPath + "/" + "single";
		    String filePath = basePath + "" + file.getOriginalFilename();
		    File dest = new File("logo.jpg");
		    file.transferTo(dest); // 파일 업로드 작업 수행
		    return "uploaded";
		
		
	}

	@PostMapping("/registeSelecDao") // 문항 추가
	public String registeSelec(@RequestBody VotePageDto votePageDto) {
		dao2.registeSelecDao(votePageDto.getVoteID(), votePageDto.getSelecContent());
		
		return votePageDto.toString();
	}
	
	@PostMapping("/registVote") // votepage(테이블) 만들기
	public String registVote(@RequestBody VotePageDto votePageDto) {
		dao2.registeVoteDao(votePageDto.getUserID(), votePageDto.getVoteTitle(), votePageDto.getVoteContent(),
				votePageDto.getVoteEndDate());

		return votePageDto.toString();
	}

	@PostMapping("/deleteVote") // delete
	public String deleteVote(@RequestBody VotePageDto votePageDto) {
		dao2.deleteVoteDao(votePageDto.getVoteID());

		return votePageDto.toString();
	}
	// 정원 Get 보내주기
	@GetMapping("/content/3")
	public List<VotePageDto> votePageGet(HttpServletRequest request) {
		
		// return 해줄 List
		List<VotePageDto> list = new ArrayList<>();
		
		// votePage와 selecList를 list에 넣어줄 것임
		VotePageDto votePage = dao2.voteGetDao("3");
		List<VotePageDto> selecList = dao2.selecGetDao("3");
		
		list.add(votePage);
		for (int i = 0; i < selecList.size(); i++) {
			list.add(selecList.get(i));
		}

		return list;
	}
	
	
}
