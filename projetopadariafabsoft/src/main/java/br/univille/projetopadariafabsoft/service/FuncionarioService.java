package br.univille.projetopadariafabsoft.service;


import br.univille.projetopadariafabsoft.entities.Funcionario;
import br.univille.projetopadariafabsoft.repository.FuncionarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Funcionario> findAll() {
        return repository.findAll();
    }

    public Optional<Funcionario> findById(Long id) {
        return repository.findById(id);
    }

    public Funcionario save(Funcionario funcionario) {
        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha()));
        return repository.save(funcionario);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Optional<Funcionario> findByUsuario(String usuario) {
        return repository.findByUsuario(usuario);
    }
}