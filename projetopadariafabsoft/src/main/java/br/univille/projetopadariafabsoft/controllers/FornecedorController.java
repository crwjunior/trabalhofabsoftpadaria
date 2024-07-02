package br.univille.projetopadariafabsoft.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univille.projetopadariafabsoft.entities.Fornecedor;
import br.univille.projetopadariafabsoft.service.FornecedorService;


@RestController
@RequestMapping("/api/fornecedores")
public class FornecedorController {
    @Autowired
    private FornecedorService service;

    @GetMapping
    public List<Fornecedor> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> findById(@PathVariable Long id) {
        Optional<Fornecedor> fornecedor = service.findById(id);
        return fornecedor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Fornecedor save(@RequestBody Fornecedor fornecedor) {
        return service.save(fornecedor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}