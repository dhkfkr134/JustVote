package com.justvote;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.justvote.dao.ICommentDao;
import com.justvote.dao.ILikeDao;
import com.justvote.dao.IRegisterDao;
import com.justvote.dao.IUser_VotepageDao;
import com.justvote.dao.IVotePageDao;
import com.justvote.dto.CommentDto;
import com.justvote.dto.LikeDto;
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
	ILikeDao dao3;
	@Autowired
	IUser_VotepageDao dao4;

	HttpSession loginId;

	@RequestMapping("/")
	public String root() throws Exception {

		return "";
	}

	@PostMapping("/register")
	public String write(@RequestBody RegisterDto registerDto) {
		dao.registerDao(registerDto.getUserName(), registerDto.getSex(), registerDto.getAge(), registerDto.getMajor(),
				registerDto.getGrade(), registerDto.getNickName(), registerDto.getUserID(), registerDto.getUserPass());
		List<VotePageDto> list2 = new ArrayList<>();
		list2 = dao2.voteIDList();
		dao3.makeLikeDao2(registerDto.getUserID(), list2, 0);
		return registerDto.toString();
	}

	@PostMapping("/signin")
	public String login(@RequestBody RegisterDto loginDto, HttpServletRequest req) {
		String check = dao.loginDao(loginDto.getUserID(), loginDto.getUserPass());

		if (check == null) {
			System.out.println("로그인 실패");
			org.apache.tomcat.jni.Error.osError();
		} else {
			System.out.println("로그인성공");
			loginId = req.getSession();
			loginId.setAttribute("userId", loginDto.getUserID());
		}
		return loginDto.toString();
	}

	@PostMapping("/logout")
	public Object logout(HttpServletRequest req) {

		loginId.setAttribute("userId", null);

		Object a = loginId.getAttribute("userId");
		return a;
	}

	// 회원가입 중 아이디 중복체크 맵핑
	@PostMapping("/duplicateCheck")
	public String idCheck(@RequestBody RegisterDto registerDto) {
		int check = dao.check(registerDto.getUserID());

		if (check == 1) {
			System.out.println("중복됐다");
			org.apache.tomcat.jni.Error.osError();
		} else {
			System.out.println("로구인 아이디 중복 체크성공");

		}
		return registerDto.getUserID();

	}

	// 계속 로그인 되는 지 확인해주는 맵핑
	@GetMapping("/getInfo")
	public Object getInfo() {

		Object a = loginId.getAttribute("userId");

		if (a == null) {

			org.apache.tomcat.jni.Error.osError();

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
		for (int i = 0; i < selecList.size(); i++) { // 선택문 리스트 넣기
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) { // 덧글 리스트 넣기
			list.add(commentList.get(i));
		}

		System.out.println(voteID + " content 테스트 성공");
		return list;
	}

	// 댓글 삭제
	@GetMapping("/deleteComment")
	public List<Object> deleteComment(@RequestParam int voteID, @RequestParam int commentID) {

		System.out.println("삭제되는 commentID = " + commentID);
		dao1.deleteDao(commentID);
		System.out.println("삭제 성공");

		List<Object> list = new ArrayList<>();

		// votePage와 selecList를 list에 넣어줄 것임
		VotePageDto votePage = dao2.voteGetDao(voteID);
		List<VotePageDto> selecList = dao2.selecGetDao(voteID);
		List<CommentDto> commentList = dao1.listDao2(voteID);

		list.add(votePage); // 투표 페이지 넣기
		for (int i = 0; i < selecList.size(); i++) { // 선택문 리스트 넣기
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) { // 덧글 리스트 넣기
			list.add(commentList.get(i));
		}

		System.out.println("/deleteComment 성공");

		return list;
	}

	// 투표삭제
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

	// 투표만들기
	@PostMapping("/makeVote") // votepage(테이블) 만들기
	public void makevote(@RequestBody VotePageDto votePageDto, LikeDto likeDto) {

		Object a = loginId.getAttribute("userId");
		// String str = String.valueOf(a);
		dao2.registVotePageDao(votePageDto.getVoteTitle(), votePageDto.getUserID(), votePageDto.getCategory());

	
		List<String> list = new ArrayList<>();
		list = votePageDto.getSelecContentList();

		int voteID = dao2.regestVotePageIDReturnDao();

		dao2.registVoteContentDao(voteID, list);
		List<RegisterDto> list2 = new ArrayList<>();
		list2 = dao.userIDList();

		dao3.makeLikeDao(list2, voteID, 0);

	}

	@GetMapping("/voteCount")
	public List<Object> voteCount(@RequestParam(value = "voteID", required = false) int voteID,
			@RequestParam(value = "selecID", required = false) String selecID,
			@RequestParam(value = "userID", required = false) String userID) {
		System.out.println("1");

		// voteCount를 늘려주는 쿼리문

		dao2.voteContentCount(voteID, selecID);

		// 쿼리문을 늘려주고 투표 화면을 다시 리턴해주는 값
		List<Object> list = new ArrayList<>();

		VotePageDto votePage = dao2.voteGetDao(voteID);
		List<VotePageDto> selecList = dao2.selecGetDao(voteID);
		List<CommentDto> commentList = dao1.listDao2(voteID);

		list.add(votePage);
		for (int i = 0; i < selecList.size(); i++) {
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) {
			list.add(commentList.get(i));
		}

		int voted = dao4.checkVoted(userID, voteID);
		if (voted == 0) {
			dao4.voteVoted(userID, voteID);
		} else {

			return list;
		}

		return list;
	}

	// 투표 중복확인
	@GetMapping("/contentVoted")
	public int votepageGetVoted(@RequestParam int voteID, @RequestParam String userID) {
		
		try {
			int voted = dao4.checkVoted(userID, voteID); 
			
			if (voted == 0) {
				// 이미 있고 투표 안했을 때
				System.out.println("테이블에 정보 있음");
				return 0;
			}
		} catch (Exception e) {
			
			dao4.createVoted(userID, voteID);
			return 0;
		}

		return 1;
	}

	// 투표의 화면을 띄워준다
	@GetMapping("/content")
	public List<Object> votepageGet(@RequestParam int voteID) {

		// return 해줄 List
		List<Object> list = new ArrayList<>();
		// int index = dao2.selecGetDao("3");

		// votePage와 selecList를 list에 넣어줄 것임
		VotePageDto votePage = dao2.voteGetDao(voteID);
		List<VotePageDto> selecList = dao2.selecGetDao(voteID);
		List<CommentDto> commentList = dao1.listDao2(voteID);

		list.add(votePage); // 투표 페이지 넣기
		for (int i = 0; i < selecList.size(); i++) { // 선택문 리스트 넣기
			list.add(selecList.get(i));
		}
		for (int i = 0; i < commentList.size(); i++) { // 덧글 리스트 넣기
			list.add(commentList.get(i));
		}

		return list;
	}

	// 투표 화면을 카테고리별로 띄워준다
	@GetMapping("/main")
	public List<VotePageDto> votepageGetCategory(@RequestParam String category) {

		List<VotePageDto> list = new ArrayList<>();

		if (category.equals("all")) {
			list = dao2.voteGetListDao();

			return list;
		} else {
			list = dao2.voteGetCategoryDao(category);

			return list;
		}
	}

	// 검색 맵핑
	@GetMapping("/mainSearch")
	public List<VotePageDto> votepageGetSearch(@RequestParam String search) {

		List<VotePageDto> list = new ArrayList<>();
		System.out.println(search);
		list = dao2.voteGetSearchDao(search);
		// System.out.println(list);
		return list;
	}

	@GetMapping("/getLike")
	public List<LikeDto> likeCheck(@RequestParam String category) {
		List<VotePageDto> list = new ArrayList<>();
		List<LikeDto> list2 = new ArrayList<>();
		Object a = loginId.getAttribute("userId");
		// list2 =dao3.checkLikeDao(voteID);
		// LikeDto checkID = dao3.checkDao(userID);
		if (category.equals("all")) {
			list = dao2.voteGetListDao();
			list2 = dao3.checkLikeDao(a);
			return list2;
		} else {
			// System.out.println(list2 + "33");
			list = dao2.voteGetCategoryDao(category);
			list2 = dao3.checkLikeDao(a);
			return list2;
		}
	}

	@PostMapping("/pushLikeBT")
	public Object insertHeart(@RequestBody LikeDto likeDto, VotePageDto votePageDto) {
		Object a = loginId.getAttribute("userId");

		dao3.insertLikeDao(a, likeDto.getVoteID(), 1);
		dao2.countDao(votePageDto.getLike(), likeDto.getVoteID());

		return a;
	}

	@PostMapping("/pushDislikeBT")
	public Object disHeart(@RequestBody LikeDto likeDto, VotePageDto votePageDto) {
		Object a = loginId.getAttribute("userId");

		dao3.disLikeDao(a, likeDto.getVoteID(), 0);
		dao2.countDao2(votePageDto.getLike(), likeDto.getVoteID());
		return a;
	}

}