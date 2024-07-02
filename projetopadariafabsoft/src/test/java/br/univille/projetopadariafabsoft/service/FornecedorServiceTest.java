package br.univille.projetopadariafabsoft.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import br.univille.projetopadariafabsoft.entities.Fornecedor;
import br.univille.projetopadariafabsoft.repository.FornecedorRepository;

@ExtendWith(MockitoExtension.class)
class FornecedorServiceTest {

    @Mock
    private FornecedorRepository fornecedorRepository;

    @InjectMocks
    private FornecedorService fornecedorService;

    @Test
    void shouldSaveFornecedor() {
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setNome("Fornecedor 1");
        fornecedor.setContato("contato@fornecedor1.com");

        when(fornecedorRepository.save(any(Fornecedor.class))).thenReturn(fornecedor);

        Fornecedor savedFornecedor = fornecedorService.save(fornecedor);

        assertNotNull(savedFornecedor);
        assertEquals("Fornecedor 1", savedFornecedor.getNome());
        assertEquals("contato@fornecedor1.com", savedFornecedor.getContato());

        verify(fornecedorRepository, times(1)).save(fornecedor);
    }

    @Test
    void shouldFindFornecedorById() {
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setId(1L);
        fornecedor.setNome("Fornecedor 1");

        when(fornecedorRepository.findById(1L)).thenReturn(Optional.of(fornecedor));

        Optional<Fornecedor> foundFornecedor = fornecedorService.findById(1L);

        assertTrue(foundFornecedor.isPresent());
        assertEquals("Fornecedor 1", foundFornecedor.get().getNome());

        verify(fornecedorRepository, times(1)).findById(1L);
    }
}