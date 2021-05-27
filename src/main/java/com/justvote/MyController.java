package com.justvote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.justvote.dao.IRegisterDao;
import com.justvote.dao.IVotePageDao;
import com.justvote.dto.RegisterDto;
import com.justvote.dto.VotePageDto;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MyController {

	@Autowired // dao 빈에 등록
	IRegisterDao dao;
	@Autowired
	IVotePageDao dao2;

	@RequestMapping("/")
	public String root() throws Exception {

		return "";
	}

	@PostMapping("/register") // front에서 back으로 주는 어노테이션
	public String write(@RequestBody RegisterDto registerDto) { // @RequestBody가 있어야 연동이 된다
		dao.registerDao(registerDto.getUserName(), registerDto.getSex(), registerDto.getAge(), registerDto.getMajor(),
				registerDto.getGrade(), registerDto.getNickName(), registerDto.getUserId(), registerDto.getUserPass());

		return registerDto.toString();
	}

	@PostMapping("/signin")
	public String login(@RequestBody RegisterDto loginDto) {
		dao.loginDao(loginDto.getUserId(), loginDto.getUserPass());

		return loginDto.toString();
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
	
	@PostMapping("/registeSelecDao") // 문항 추가
	public String registeSelec(@RequestBody VotePageDto votePageDto) {
		dao2.registeSelecDao(votePageDto.getVoteID(), votePageDto.getSelecContent());
		
		return votePageDto.toString();
	}
}
