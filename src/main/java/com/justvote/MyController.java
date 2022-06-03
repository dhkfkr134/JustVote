package com.justvote;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

//import org.apache.commons.io.FileUtils;
//import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.justvote.dao.ICommentDao;
import com.justvote.dao.IRegisterDao;
import com.justvote.dao.IUser_VotepageDao;
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
	@Autowired
	IUser_VotepageDao dao3;
	
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
			Object a = loginId.getAttribute("userId");
			System.out.println(a);
		}
		return loginDto.toString();
	}

	@PostMapping("/logout")
	public Object logout(HttpServletRequest req) {

		loginId.setAttribute("userId", null);

		Object a = loginId.getAttribute("userId");

		return a;
	}

	@GetMapping("/getInfo")
	public Object getInfo() {
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

	// 덧글 등록
	@GetMapping("/showComment")
	public List<Object> writeComment(@RequestParam(value = "commentContent", required = false) String commentContent,
			@RequestParam(value = "voteID", required = false) int voteID,
			@RequestParam(value = "userID", required = false) String userID) {
		
		System.out.println("Comment Content: " + commentContent);
		System.out.println("voteID: " + voteID);
		System.out.println("userID: " + userID);
		String nickName = dao.getUserNickNameDao(userID);
		System.out.println("NickName: " + nickName);
		dao1.writeDao(commentContent, voteID, nickName, userID);

		List<Object> list = new ArrayList<>();

		// votePage와 selecList를 list에 넣어줄 것임
		VotePageDto votePage = dao2.voteGetDao(voteID);
		List<VotePageDto> selecList = dao2.selecGetDao(voteID);
		List<CommentDto> commentList = dao1.listDao2(voteID);

		list.add(votePage); // 투표 페이지 넣기
		for (int i = 0; i < selecList.size(); i++) { //선택문 리스트 넣기
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) { // 덧글 리스트 넣기
			list.add(commentList.get(i));
		}

		System.out.println(voteID + " content 테스트 성공");
		return list;
	}
	
	@GetMapping("/deleteComment")
	public List<Object> deleteComment(@RequestParam int voteID, @RequestParam int commentID){
		
		System.out.println("삭제되는 commentID = " + commentID);
		dao1.deleteDao(commentID);
		System.out.println("삭제 성공");
		
		List<Object> list = new ArrayList<>();

		// votePage와 selecList를 list에 넣어줄 것임
		VotePageDto votePage = dao2.voteGetDao(voteID);
		List<VotePageDto> selecList = dao2.selecGetDao(voteID);
		List<CommentDto> commentList = dao1.listDao2(voteID);

		list.add(votePage); // 투표 페이지 넣기
		for (int i = 0; i < selecList.size(); i++) { //선택문 리스트 넣기
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) { // 덧글 리스트 넣기
			list.add(commentList.get(i));
		}
		
		System.out.println("/deleteComment 성공");

		return list;
	}
	
	@GetMapping("/deleteVote") // delete
	public List<VotePageDto> deleteVote(@RequestParam int voteID) {
		
		List<VotePageDto> list = new ArrayList<>();

			dao3.delete(voteID);
			dao1.delete(voteID);
			dao2.deleteSelection(voteID);
			dao2.deleteVoteDao(voteID);
		
		
		list = dao2.voteGetListDao();
		return list;
			

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


	// 동우 투표만들기
	@PostMapping("/makeVote") // votepage(테이블) 만들기
	public void makevote(@RequestBody VotePageDto votePageDto, HttpServletRequest req, RegisterDto rd) {

		Object a = loginId.getAttribute("userId");
		String str = String.valueOf(a);
		dao2.registVotePageDao(votePageDto.getVoteTitle(), votePageDto.getUserID(), votePageDto.getCategory());

		System.out.println(votePageDto.getVoteTitle());
		System.out.println(votePageDto.getUserID());
		System.out.println(votePageDto.getCategory());

		List<String> list = new ArrayList<>();
		list = votePageDto.getSelecContentList();

		int voteID = dao2.regestVotePageIDReturnDao();

		dao2.registVoteContentDao(voteID, list);
		System.out.println("makeVote");
	}

	// 투표페이지 Content의 Post요청
	@GetMapping("/voteCount")
	public List<Object> voteCount(@RequestParam(value = "voteID", required = false) int voteID,
			@RequestParam(value = "selecID", required = false) String selecID,
			@RequestParam(value = "userID", required = false) String userID) {
		System.out.println("1");
		
		  // voteCount를 늘려주는 쿼리문
		  
		  dao2.voteContentCount(voteID, selecID);
		 
		  
		  // 쿼리문을 늘려주고 투표 화면을 다시 리턴해주는 값 
		  List<Object> list = new ArrayList<>();
		  
		  VotePageDto votePage = dao2.voteGetDao(voteID); List<VotePageDto>
		  selecList = dao2.selecGetDao(voteID); 
		  List<CommentDto> commentList = dao1.listDao2(voteID);

			list.add(votePage);
			for (int i = 0; i < selecList.size(); i++) {
				list.add(selecList.get(i));
			}
			for (int i = 0; i < commentList.size(); i++) {
				list.add(commentList.get(i));
			}

			int voted = dao3.checkVoted(userID, voteID);
			if (voted == 0) {
				dao3.voteVoted(userID, voteID);
			} else {
				System.out.println("이미 투표했음");
				return list;
			}
		
		System.out.println("voteID : " + voteID + ", selecID : " + selecID + " voteCount 테스트 성공");
		return list;
	}
	
	// 투표 중복확인
	@GetMapping("/contentVoted")
	public int votepageGetVoted(@RequestParam int voteID) {
		Object id = loginId.getAttribute("userId");
		String userID = String.valueOf(id);
		
		System.out.println("testetsetsetestset : "+userID);
		System.out.println(id + " id");
		System.out.println("contentVoted 호출");
		try {
			int voted = dao3.checkVoted(userID, voteID); 
			System.out.println(voted);
			if (voted == 0) {
				// 이미 있고 투표 안했을 때
				System.out.println("테이블에 정보 있음");
				return 0;
			}
		} catch (Exception e) {
			System.out.println("user_votepage 생성 완료");
			dao3.createVoted(userID, voteID);
			return 0;
		}

		return 1;
	}

	// 투표의 화면을 띄워준다
	@GetMapping("/content")
	public List<Object> votepageGet(@RequestParam int voteID) {
		
		// return 해줄 List
		List<Object> list = new ArrayList<>();
	

		VotePageDto votePage = dao2.voteGetDao(voteID);
		List<VotePageDto> selecList = dao2.selecGetDao(voteID);
		List<CommentDto> commentList = dao1.listDao2(voteID);

		list.add(votePage); // 투표 페이지 넣기
		for (int i = 0; i < selecList.size(); i++) { //선택문 리스트 넣기
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) { // 덧글 리스트 넣기
			list.add(commentList.get(i));
		}

		System.out.println(voteID + " content 테스트 성공");
		return list;
	}

	
	// 투표 화면을 카테고리별로 띄워준다
	@GetMapping("/main")
	public List<VotePageDto> votepageGetCategory(@RequestParam String category) {

		List<VotePageDto> list = new ArrayList<>();

		if (category.equals("all")) {
			list = dao2.voteGetListDao();
			System.out.println(category + "   11");
			return list;
		} else {
			list = dao2.voteGetCategoryDao(category);
			System.out.println(category + "   22");
			return list;
		}
	}
	
	@GetMapping("/mainSearch")
	public List<VotePageDto> votepageGetSearch(@RequestParam String search) {

		List<VotePageDto> list = new ArrayList<>();
		System.out.println(search);
		list = dao2.voteGetSearchDao(search);
	//	System.out.println(list);
		return list;
	}

}
