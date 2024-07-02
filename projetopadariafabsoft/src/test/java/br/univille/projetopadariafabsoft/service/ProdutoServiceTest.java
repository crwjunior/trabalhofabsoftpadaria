package br.univille.projetopadariafabsoft.service;



import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import br.univille.projetopadariafabsoft.entities.Produto;
import br.univille.projetopadariafabsoft.repository.ProdutoRepository;

@ExtendWith(MockitoExtension.class)
class ProdutoServiceTest {

    @Mock
    private ProdutoRepository produtoRepository;

    @InjectMocks
    private ProdutoService produtoService;

    @Test
    void shouldSaveProduto() {
        Produto produto = new Produto();
        produto.setNome("Pão");
        produto.setPreco(1.99);

        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);

        Produto savedProduto = produtoService.save(produto);

        assertNotNull(savedProduto);
        assertEquals("Pão", savedProduto.getNome());
        assertEquals(1.99, savedProduto.getPreco());

        verify(produtoRepository, times(1)).save(produto);
    }

    @Test
    void shouldFindProdutoById() {
        Produto produto = new Produto();
        produto.setId(1L);
        produto.setNome("Pão");

        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));

        Optional<Produto> foundProduto = produtoService.findById(1L);

        assertTrue(foundProduto.isPresent());
        assertEquals("Pão", foundProduto.get().getNome());

        verify(produtoRepository, times(1)).findById(1L);
    }
}