package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.UrlShorternerService;

@RestController
@RequestMapping("urlShorterner")
public class UrlShorternerController {
	
	@Autowired
	private UrlShorternerService urlShorternerService;
	
	@CrossOrigin
	@PostMapping("/OriginalToShortUrl")
	public Map<String,Object> OriginalToShortUrl(@RequestParam("originalUrl") String originalUrl) {
		return urlShorternerService.OriginalToShortUrl(originalUrl);
	}
	
	
	@CrossOrigin
	@GetMapping("/AccessShortUrl")
	public Map<String,Object> AccessShortUrl(@RequestParam("shortUrl") String shortUrl) {
		return urlShorternerService.AccessShortUrl(shortUrl);
	}
	
	

	
}
