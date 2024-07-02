package br.univille.projetopadariafabsoft.controllers;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univille.projetopadariafabsoft.entities.Produto;
import br.univille.projetopadariafabsoft.service.ProdutoService;

@Service


@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
    @Autowired
    private ProdutoService service;

    @GetMapping
    public List<Produto> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> findById(@PathVariable Long id) {
        Optional<Produto> produto = service.findById(id);
        return produto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Produto save(@RequestBody Produto produto) {
        return service.save(produto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}