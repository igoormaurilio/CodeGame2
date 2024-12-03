package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.JogosModel;
import com.example.demo.service.JogosService;

@RestController
@CrossOrigin
@RequestMapping("/catalogo")
public class JogosController {

    @Autowired
    private JogosService jogosService;

    @PostMapping("/adicionar")
    public ResponseEntity<JogosModel> adicionarCatalogo(@RequestBody JogosModel jogo) {
        JogosModel jogoCriado = jogosService.criarJogo(jogo);
        return new ResponseEntity<>(jogo, HttpStatus.CREATED);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<JogosModel>> listarCatalogo() {
        List<JogosModel> jogos = jogosService.listarJogos();
        return ResponseEntity.ok(jogos);
    }

 
    @GetMapping("/buscar")
    public ResponseEntity<JogosModel> buscarJogoPorNome(@RequestParam String nome) {
        JogosModel  jogo = jogosService.buscarPorNome(nome);  
        if (jogo != null) {
            return ResponseEntity.ok(jogo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<JogosModel> atualizarJogo(@PathVariable("id") Long id, @RequestBody JogosModel jogoAtualizado) {
        JogosModel jogo = jogosService.atualizarJogo(id, jogoAtualizado);
        return jogo != null ? ResponseEntity.ok(jogo) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarJogo(@PathVariable("id") Long id) {
        return jogosService.deletarJogo(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
