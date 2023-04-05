package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.UrlsData;

public interface UrlsDataRepository extends JpaRepository<UrlsData, Integer> {
	
	public UrlsData findByShortenUrl(String shortenUrl);
	
}
