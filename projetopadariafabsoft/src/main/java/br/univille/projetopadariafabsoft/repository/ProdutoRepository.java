package br.univille.projetopadariafabsoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.projetopadariafabsoft.entities.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}