package com.example.demo.service;

import com.example.demo.model.JogosModel;
import com.example.demo.repository.JogosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JogosService {

    @Autowired
    private JogosRepository jogosRepository;

    public JogosModel criarJogo(JogosModel jogo) {
        return jogosRepository.save(jogo);
    }

    public JogosModel buscarPorNome(String nome) {
        return jogosRepository.findByNome(nome); 
    }

    public boolean deletarJogo(Long id) {
        if (jogosRepository.existsById(id)) {
            jogosRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public JogosModel atualizarJogo(Long id, JogosModel jogoAtualizado) {
        if (jogosRepository.existsById(id)) {
            jogoAtualizado.setId(id);
            return jogosRepository.save(jogoAtualizado);
        }
        return null;
    }

	public List<JogosModel> listarJogos() {
		// TODO Auto-generated method stub
		return jogosRepository.findAll();
	}
}
