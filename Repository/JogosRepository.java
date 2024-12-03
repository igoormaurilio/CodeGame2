package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.JogosModel;

public interface JogosRepository extends JpaRepository <JogosModel, Long>{
	
	JogosModel findByNome(String nome);

}
