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

import br.univille.projetopadariafabsoft.entities.Funcionario;
import br.univille.projetopadariafabsoft.service.FuncionarioService;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {
    @Autowired
    private final FuncionarioService service;

    public FuncionarioController(FuncionarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Funcionario> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> findById(@PathVariable Long id) {
        Optional<Funcionario> funcionario;
        funcionario = service.findById(id);
        return funcionario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Funcionario save(@RequestBody Funcionario funcionario) {
        return (Funcionario) service.save(funcionario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Funcionario loginRequest) {
        Optional<Funcionario> funcionario = service.findByUsuario(loginRequest.getUsuario());
        
        if (funcionario.isPresent() && funcionario.get().getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.ok(funcionario.get());
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}