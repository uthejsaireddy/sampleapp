package com.example.demo.service;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.UrlsData;
import com.example.demo.repository.UrlsDataRepository;

@Service
public class UrlShorternerService {
	
	
	@Autowired
	private UrlsDataRepository urlsDataRepository;
	
	 DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	 String ldt = (LocalDateTime.now()).format(dtf);
	
	
	public Map<String,Object> OriginalToShortUrl(String originalUrl) {
		
		
		Map<String, Object> mp = new HashMap<String,Object>();
		
		UrlsData urlsData = new UrlsData();
		
		try {
			
			System.out.println(isValidURL(originalUrl));
			
			if(isValidURL(originalUrl)) {
				String shortUrl = "http://localhost:3000/getOrgUrl/:"+getRandomChars();
				
				urlsData.setOriginalUrl(originalUrl);
				urlsData.setShortenUrl(shortUrl);
				urlsData.setCreatedDt(ldt);
				
				urlsDataRepository.save(urlsData);
				
				mp.put("shortUrl",urlsData.getShortenUrl());
				mp.put("status",true);
			}else {
				mp.put("shortUrl",null);
				mp.put("status",false);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			mp.put("shortUrl",null);
			mp.put("status",false);
		}
		
		return mp;
	}
	
	
	Boolean isValidURL(String url) throws MalformedURLException, URISyntaxException {
	    try {
	        new URL(url).toURI();
	        return true;
	    } catch (MalformedURLException e) {
	        return false;
	    } catch (URISyntaxException e) {
	        return false;
	    }
	}
	
	private String getRandomChars() {
		String randomStr = "";
		String possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (int i = 0;i<5; i++)
		randomStr += possibleChars.charAt((int) Math. floor(Math. random() * possibleChars.length()));
		return randomStr;
	}
	
	
	public Map<String,Object> AccessShortUrl(String shortUrl) {
		
		Map<String,Object> mp = new HashMap<String, Object>();
		
		UrlsData urlsData = new UrlsData();
		
		try {
//			System.out.println("in line 95---");
//			System.out.println(urlsData.getId());
			urlsData = urlsDataRepository.findByShortenUrl(shortUrl);
			
			if(urlsData.getId() != null) {
				
				String createdDt[] = (urlsData.getCreatedDt()).split(" ");
				String currentDt[] = ldt.split(" ");
				
//				System.out.println(urlsData.getCreatedDt());
//				System.out.println(ldt);
//				
////				System.out.println();
				
				Long minutes = calculateTimeInMinutes(createdDt[1],currentDt[1]);
				
//				System.out.println(minutes);
//				
//				System.out.println(minutes <= 5);
				
				if(minutes <= 5) {
					mp.put("OriginalUrl",urlsData.getOriginalUrl());
					mp.put("status",true);
				}else {
					mp.put("OriginalUrl","expired");
					mp.put("status",false);
				}
				
			}else {
				mp.put("OriginalUrl","not exits");
				mp.put("status",false);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			mp.put("OriginalUrl",null);
			mp.put("status",false);
		}
		
		return mp;
	}
	
	public Long calculateTimeInMinutes(String createdTime,String currentTime) {
		
		Long differenceInMinutes = null;
		
		try {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH:mm:ss");

		    // Parsing the Time Period
		    Date date1 = simpleDateFormat.parse(createdTime);
		    Date date2 = simpleDateFormat.parse(currentTime);

	    // Calculating the difference in milliseconds
	    Long differenceInMilliSeconds
	        = Math.abs(date2.getTime() - date1.getTime());


	    // Calculating the difference in Minutes
	    differenceInMinutes
	        = (differenceInMilliSeconds / (60 * 1000)) % 60;
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return differenceInMinutes;
	}
	
}
