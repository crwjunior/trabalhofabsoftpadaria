package br.univille.projetopadariafabsoft.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.projetopadariafabsoft.entities.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Optional<Funcionario> findByUsuario(String usuario);
}