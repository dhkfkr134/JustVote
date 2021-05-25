package com.justvote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.justvote.dao.IRegisterDao;
import com.justvote.dto.RegisterDto;

	

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MyController {
	@Autowired
	IRegisterDao dao;
	

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
	public String login(@RequestBody RegisterDto loginDto) {
		dao.loginDao(loginDto.getUserId(), loginDto.getUserPass());
		
		return loginDto.toString(); 
		
	}
	@GetMapping("/getInfo")
	public String checkInfo(@RequestBody RegisterDto checkDto) {
	dao.check(checkDto.getUserId());
	return checkDto.toString();
		
	}
	

}
