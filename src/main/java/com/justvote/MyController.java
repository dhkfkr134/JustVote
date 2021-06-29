package com.justvote;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.justvote.dao.ICommentDao;
import com.justvote.dao.IRegisterDao;
import com.justvote.dao.IVotePageDao;
import com.justvote.dto.CommentDto;
import com.justvote.dto.RegisterDto;
import com.justvote.dto.VotePageDto;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MyController {

	@Autowired // dao 빈에 등록
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
				registerDto.getGrade(), registerDto.getNickName(), registerDto.getUserID(), registerDto.getUserPass());

		return registerDto.toString();

	}

	@PostMapping("/signin")
	public String login(@RequestBody RegisterDto loginDto, HttpServletRequest req) {
		String check = dao.loginDao(loginDto.getUserID(), loginDto.getUserPass());

		System.out.println("postman /signin");
		if (check == null) {
			System.out.println("로그인 실패");
			org.apache.tomcat.jni.Error.osError();
		} else {
			System.out.println("성공");
			loginId = req.getSession();
			loginId.setAttribute("userId", loginDto.getUserID());
		}
		return loginDto.toString();

	}
	
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
		System.out.println("postman 받기 /getInfo");
		Object a = loginId.getAttribute("userId");

		if (loginId.getAttribute("userId") == null) {
			System.out.println("데이터가 없습니다");

			org.apache.tomcat.jni.Error.osError();

		} else {
			System.out.println("성공33");
		}
		return a;
	}
	
	@PostMapping("/registerComment")
	public Object writeComment(@RequestBody CommentDto cd) {
		//dao1.listDao();
		dao1.writeDao(cd.getCommentContent(), cd.getVoteID(), cd.getUserID());
		//dao1.delete(cd.getCommentNum());
	Object a = loginId.getAttribute("userId");
	
	return cd.toString();
	}
	
	
	
	@PostMapping("/deleteVote") // delete
	public String deleteVote(@RequestBody VotePageDto votePageDto) {
		dao2.deleteVoteDao(votePageDto.getVoteID());

		return votePageDto.toString();
	}

	@PostMapping("/registeSelecDao") // 문항 추가
	public String registeSelec(@RequestBody VotePageDto votePageDto) {
		dao2.registeSelecDao(votePageDto.getVoteID(), votePageDto.getSelecContent());

		return votePageDto.toString();
	}

	@GetMapping("/justvote") // test
	public String test(@RequestBody VotePageDto votePageDto) {
		dao2.testDao(votePageDto.getVoteID());

		return votePageDto.toString();
	}

	// Main페이지 Get요청 보내주기
	@GetMapping("/getMain")
	public List<VotePageDto> mainPageGet(HttpServletRequest request) {

		System.out.println("postman 요청받기 성공");
		// return 해줄 List
		List<VotePageDto> list = new ArrayList<>();

		// votePage와 selecList를 list에 넣어줄 것임
		list = dao2.voteGetListDao();

		return list;
		
	}

	// 동우 투표만들기
	@PostMapping("/makeVote") // votepage(테이블) 만들기
	public void makevote(@RequestBody VotePageDto votePageDto,HttpServletRequest req,RegisterDto rd
			) {
		Object a = loginId.getAttribute("userID");
		String str = String.valueOf(a);
		// votepage insert
		dao2.registVotePageDao(votePageDto.getVoteTitle(),votePageDto.getUserID());
		System.out.println(votePageDto.getVoteTitle());
		System.out.println(votePageDto.getUserID());
		List<String> list = new ArrayList<>();
		list = votePageDto.getSelecContentList();

		String voteID = dao2.regestVotePageIDReturnDao();

		dao2.registVoteContentDao(voteID, list);
	}

	// 정원 Get 보내주기
	@GetMapping("/content/{index}")
	public List<Object> votePageGet(HttpServletRequest request, @PathVariable("index") String index) {

		// return 해줄 List
		List<Object> list = new ArrayList<>();
	//	int index = dao2.selecGetDao("3");

		// votePage와 selecList를 list에 넣어줄 것임
		VotePageDto votePage = dao2.voteGetDao("3");
		List<VotePageDto> selecList = dao2.selecGetDao("3");
		List<CommentDto> commentList = dao1.listDao2("3");
				
		list.add(votePage);
		for (int i = 0; i < selecList.size(); i++) {
			list.add(selecList.get(i));
		}
		for(int i = 0; i < commentList.size(); i++) {
			list.add(commentList.get(i));
		}
		
		return list;
	}

	// 투표페이지 Content의 Post요청
	//
	@PostMapping("/setVote")
	public void voteContentCount(@RequestBody VotePageDto votePageDto) {
		System.out.println("111");
		dao2.voteContentCount(votePageDto.getVoteID(), votePageDto.getSelecContent());
		System.out.println("222");
	}

//	@GetMapping("/content")
//	public List<VotePageDto> 

	/*
	 * @GetMapping("/") public String list(@RequestBody VotePageDto votePageDto) {
	 * dao2.listDao();
	 * 
	 * return votePageDto.toString(); }
	 */
}
