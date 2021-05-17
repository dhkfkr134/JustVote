package com.justvote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.justvote.dao.IRegisterDao;

class Person {

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserPass() {
		return userPass;
	}

	public void setUserPass(String userPass) {
		this.userPass = userPass;
	}

	@Override
	public String toString() {
		return "Person [userName=" + userName + ", sex=" + sex + ", age=" + age + ", major=" + major + ", grade="
				+ grade + ", nickName=" + nickName + ", userId=" + userId + ", userPass=" + userPass + "]";
	}

	public String userName; // client Name
	public String sex; // client sex
	public String age; // client age
	public String major; // client major
	public String grade; // client grade
	public String nickName; // client nickName
	public String userId; // client
	public String userPass; // client PW
}

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
	public String write(@RequestBody Person person) {
		dao.registerDao(person.getUserName(), person.getSex(), person.getAge(), person.getMajor(), person.getGrade(),
				person.getNickName(), person.getUserId(), person.getUserPass());

		return person.toString();

	}

}
