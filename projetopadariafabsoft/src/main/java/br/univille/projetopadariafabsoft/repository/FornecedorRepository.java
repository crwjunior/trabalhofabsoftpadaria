package br.univille.projetopadariafabsoft.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.projetopadariafabsoft.entities.Fornecedor;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    Optional<Fornecedor> findByUsuario(String usuario);
}