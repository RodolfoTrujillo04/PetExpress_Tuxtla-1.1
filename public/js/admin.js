// ========== VARIABLES GLOBALES ==========
let navLinks, sections;
let categoriaModal, productoModal, clienteModal, mascotaModal, pedidoModal, usuarioModal;
let categoriaForm, productoForm, clienteForm, mascotaForm, pedidoForm, usuarioForm;
let addCategoriaBtn, addProductoBtn, addClienteBtn, addMascotaBtn, addPedidoBtn, addUsuarioBtn;
let categoriaSelect, mascotaClienteSelect, pedidoClienteSelect, usuarioClienteSelect;

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    inicializarElementos();
    configurarEventListeners();
    
    // Mostrar dashboard por defecto
    document.getElementById('dashboard').style.display = 'block';
});

function inicializarElementos() {
    // Elementos globales
    navLinks = document.querySelectorAll('.nav-link');
    sections = document.querySelectorAll('.crud-section');
    
    // Modales
    categoriaModal = document.getElementById('categoriaModal');
    productoModal = document.getElementById('productoModal');
    clienteModal = document.getElementById('clienteModal');
    mascotaModal = document.getElementById('mascotaModal');
    pedidoModal = document.getElementById('pedidoModal');
    usuarioModal = document.getElementById('usuarioModal');
    
    // Forms
    categoriaForm = document.getElementById('categoriaForm');
    productoForm = document.getElementById('productoForm');
    clienteForm = document.getElementById('clienteForm');
    mascotaForm = document.getElementById('mascotaForm');
    pedidoForm = document.getElementById('pedidoForm');
    usuarioForm = document.getElementById('usuarioForm');
    
    // Botones agregar
    addCategoriaBtn = document.getElementById('addCategoriaBtn');
    addProductoBtn = document.getElementById('addProductoBtn');
    addClienteBtn = document.getElementById('addClienteBtn');
    addMascotaBtn = document.getElementById('addMascotaBtn');
    addPedidoBtn = document.getElementById('addPedidoBtn');
    addUsuarioBtn = document.getElementById('addUsuarioBtn');
    
    // Selects
    categoriaSelect = document.getElementById('productoCategoria');
    mascotaClienteSelect = document.getElementById('mascotaCliente');
    pedidoClienteSelect = document.getElementById('pedidoCliente');
    usuarioClienteSelect = document.getElementById('usuarioCliente');
}

function configurarEventListeners() {
    // ========== NAVEGACIÓN ==========
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Actualizar navegación activa
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar sección correspondiente
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(sectionId).style.display = 'block';
            
            // Cargar datos de la sección
            switch(sectionId) {
                case 'categorias':
                    cargarCategorias();
                    break;
                case 'productos':
                    cargarProductos();
                    cargarCategoriasParaSelect();
                    break;
                case 'clientes':
                    cargarClientes();
                    break;
                case 'mascotas':
                    cargarMascotas();
                    cargarClientesParaSelect(mascotaClienteSelect);
                    break;
                case 'pedidos':
                    cargarPedidos();
                    cargarClientesParaSelect(pedidoClienteSelect);
                    break;
                case 'usuarios':
                    cargarUsuarios();
                    cargarClientesParaSelect(usuarioClienteSelect);
                    break;
            }
        });
    });

    // ========== LOGOUT ==========
    document.getElementById('logoutBtn').addEventListener('click', async function() {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/login.html';
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    });

    // ========== EVENT LISTENERS PARA MODALES ==========
    addCategoriaBtn.addEventListener('click', () => abrirModalCategoria());
    addProductoBtn.addEventListener('click', () => abrirModalProducto());
    addClienteBtn.addEventListener('click', () => abrirModalCliente());
    addMascotaBtn.addEventListener('click', () => abrirModalMascota());
    addPedidoBtn.addEventListener('click', () => abrirModalPedido());
    addUsuarioBtn.addEventListener('click', () => abrirModalUsuario());

    // Forms
    categoriaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarCategoria();
    });

    productoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarProducto();
    });

    clienteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarCliente();
    });

    mascotaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarMascota();
    });

    pedidoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarPedido();
    });

    usuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarUsuario();
    });

    // Cerrar modales
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            categoriaModal.style.display = 'none';
            productoModal.style.display = 'none';
            clienteModal.style.display = 'none';
            mascotaModal.style.display = 'none';
            pedidoModal.style.display = 'none';
            usuarioModal.style.display = 'none';
        });
    });

    // Cerrar modales al hacer click fuera
    window.addEventListener('click', (e) => {
        if (e.target === categoriaModal) categoriaModal.style.display = 'none';
        if (e.target === productoModal) productoModal.style.display = 'none';
        if (e.target === clienteModal) clienteModal.style.display = 'none';
        if (e.target === mascotaModal) mascotaModal.style.display = 'none';
        if (e.target === pedidoModal) pedidoModal.style.display = 'none';
        if (e.target === usuarioModal) usuarioModal.style.display = 'none';
    });
}

// ========== FUNCIONES PARA CATEGORÍAS ==========
async function cargarCategorias() {
    try {
        const response = await fetch('/api/categorias');
        const categorias = await response.json();
        
        const tbody = document.querySelector('#categoriasTable tbody');
        tbody.innerHTML = '';
        
        categorias.forEach(categoria => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${categoria.id_categoria}</td>
                <td>${categoria.nombre}</td>
                <td>${categoria.descripcion || ''}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editarCategoria(${categoria.id_categoria})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarCategoria(${categoria.id_categoria})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar categorías:', error);
        mostrarError('Error al cargar categorías');
    }
}

function abrirModalCategoria(categoria = null) {
    const modalTitle = document.getElementById('categoriaModalTitle');
    
    if (categoria) {
        modalTitle.textContent = 'Editar Categoría';
        document.getElementById('categoriaId').value = categoria.id_categoria;
        document.getElementById('categoriaNombre').value = categoria.nombre;
        document.getElementById('categoriaDescripcion').value = categoria.descripcion || '';
    } else {
        modalTitle.textContent = 'Agregar Categoría';
        categoriaForm.reset();
        document.getElementById('categoriaId').value = '';
    }
    
    categoriaModal.style.display = 'flex';
}

async function guardarCategoria() {
    const id = document.getElementById('categoriaId').value;
    const nombre = document.getElementById('categoriaNombre').value;
    const descripcion = document.getElementById('categoriaDescripcion').value;
    
    const categoriaData = { nombre, descripcion };
    
    try {
        const url = id ? `/api/categorias/${id}` : '/api/categorias';
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoriaData)
        });
        
        if (response.ok) {
            categoriaModal.style.display = 'none';
            cargarCategorias();
            mostrarExito('Categoría guardada exitosamente');
        } else {
            const error = await response.json();
            mostrarError('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error al guardar categoría:', error);
        mostrarError('Error de conexión');
    }
}

// ========== FUNCIONES PARA PRODUCTOS ==========
async function cargarProductos() {
    try {
        const response = await fetch('/api/productos');
        const productos = await response.json();
        
        const tbody = document.querySelector('#productosTable tbody');
        tbody.innerHTML = '';
        
        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.id_producto}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.categoria_nombre || 'N/A'}</td>
                <td>${producto.certificado_calidad ? 'Sí' : 'No'}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editarProducto(${producto.id_producto})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarProducto(${producto.id_producto})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        mostrarError('Error al cargar productos');
    }
}

async function cargarCategoriasParaSelect() {
    try {
        const response = await fetch('/api/categorias');
        const categorias = await response.json();
        
        categoriaSelect.innerHTML = '<option value="">Seleccionar categoría</option>';
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id_categoria;
            option.textContent = categoria.nombre;
            categoriaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

function abrirModalProducto(producto = null) {
    const modalTitle = document.getElementById('productoModalTitle');
    
    if (producto) {
        modalTitle.textContent = 'Editar Producto';
        document.getElementById('productoId').value = producto.id_producto;
        document.getElementById('productoNombre').value = producto.nombre;
        document.getElementById('productoDescripcion').value = producto.descripcion || '';
        document.getElementById('productoPrecio').value = producto.precio;
        document.getElementById('productoStock').value = producto.stock;
        document.getElementById('productoCategoria').value = producto.id_categoria;
        document.getElementById('productoImagen').value = producto.imagen_url || '';
        document.getElementById('productoCertificado').checked = producto.certificado_calidad;
    } else {
        modalTitle.textContent = 'Agregar Producto';
        productoForm.reset();
        document.getElementById('productoId').value = '';
        document.getElementById('productoCertificado').checked = true;
    }
    
    productoModal.style.display = 'flex';
}

async function guardarProducto() {
    const id = document.getElementById('productoId').value;
    const nombre = document.getElementById('productoNombre').value;
    const descripcion = document.getElementById('productoDescripcion').value;
    const precio = parseFloat(document.getElementById('productoPrecio').value);
    const stock = parseInt(document.getElementById('productoStock').value);
    const id_categoria = document.getElementById('productoCategoria').value;
    const imagen_url = document.getElementById('productoImagen').value;
    const certificado_calidad = document.getElementById('productoCertificado').checked;
    
    const productoData = { 
        nombre, 
        descripcion, 
        precio, 
        stock, 
        id_categoria, 
        imagen_url, 
        certificado_calidad 
    };
    
    try {
        const url = id ? `/api/productos/${id}` : '/api/productos';
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoData)
        });
        
        if (response.ok) {
            productoModal.style.display = 'none';
            cargarProductos();
            mostrarExito('Producto guardado exitosamente');
        } else {
            const error = await response.json();
            mostrarError('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error al guardar producto:', error);
        mostrarError('Error de conexión');
    }
}

// ========== FUNCIONES PARA CLIENTES ==========
async function cargarClientes() {
    try {
        const response = await fetch('/api/clientes');
        const clientes = await response.json();
        
        const tbody = document.querySelector('#clientesTable tbody');
        tbody.innerHTML = '';
        
        clientes.forEach(cliente => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cliente.id_cliente}</td>
                <td>${cliente.nombre} ${cliente.apellido || ''}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.telefono || ''}</td>
                <td>${cliente.ciudad || ''}</td>
                <td>${new Date(cliente.fecha_registro).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editarCliente(${cliente.id_cliente})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarCliente(${cliente.id_cliente})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        mostrarError('Error al cargar clientes');
    }
}

async function cargarClientesParaSelect(selectElement) {
    try {
        const response = await fetch('/api/clientes');
        const clientes = await response.json();
        
        selectElement.innerHTML = '<option value="">Seleccionar cliente</option>';
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id_cliente;
            option.textContent = `${cliente.nombre} ${cliente.apellido || ''} (${cliente.correo})`;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

function abrirModalCliente(cliente = null) {
    const modalTitle = document.getElementById('clienteModalTitle');
    
    if (cliente) {
        modalTitle.textContent = 'Editar Cliente';
        document.getElementById('clienteId').value = cliente.id_cliente;
        document.getElementById('clienteNombre').value = cliente.nombre;
        document.getElementById('clienteApellido').value = cliente.apellido || '';
        document.getElementById('clienteEmail').value = cliente.correo;
        document.getElementById('clienteTelefono').value = cliente.telefono || '';
        document.getElementById('clienteDireccion').value = cliente.direccion || '';
        document.getElementById('clienteCiudad').value = cliente.ciudad || '';
    } else {
        modalTitle.textContent = 'Agregar Cliente';
        clienteForm.reset();
        document.getElementById('clienteId').value = '';
    }
    
    clienteModal.style.display = 'flex';
}

async function guardarCliente() {
    const id = document.getElementById('clienteId').value;
    const nombre = document.getElementById('clienteNombre').value;
    const apellido = document.getElementById('clienteApellido').value;
    const correo = document.getElementById('clienteEmail').value;
    const telefono = document.getElementById('clienteTelefono').value;
    const direccion = document.getElementById('clienteDireccion').value;
    const ciudad = document.getElementById('clienteCiudad').value;
    
    const clienteData = { 
        nombre, 
        apellido, 
        correo, 
        telefono, 
        direccion, 
        ciudad 
    };
    
    try {
        const url = id ? `/api/clientes/${id}` : '/api/clientes';
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteData)
        });
        
        if (response.ok) {
            clienteModal.style.display = 'none';
            cargarClientes();
            // Actualizar selects que usan clientes
            cargarClientesParaSelect(mascotaClienteSelect);
            cargarClientesParaSelect(pedidoClienteSelect);
            cargarClientesParaSelect(usuarioClienteSelect);
            mostrarExito('Cliente guardado exitosamente');
        } else {
            const error = await response.json();
            mostrarError('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error al guardar cliente:', error);
        mostrarError('Error de conexión');
    }
}

// ========== FUNCIONES PARA MASCOTAS ==========
async function cargarMascotas() {
    try {
        const response = await fetch('/api/mascotas');
        const mascotas = await response.json();
        
        const tbody = document.querySelector('#mascotasTable tbody');
        tbody.innerHTML = '';
        
        mascotas.forEach(mascota => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${mascota.id_mascota}</td>
                <td>${mascota.nombre}</td>
                <td>${mascota.tipo}</td>
                <td>${mascota.raza || ''}</td>
                <td>${mascota.edad || ''}</td>
                <td>${mascota.cliente_nombre || 'N/A'}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editarMascota(${mascota.id_mascota})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarMascota(${mascota.id_mascota})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar mascotas:', error);
        mostrarError('Error al cargar mascotas');
    }
}

function abrirModalMascota(mascota = null) {
    const modalTitle = document.getElementById('mascotaModalTitle');
    
    if (mascota) {
        modalTitle.textContent = 'Editar Mascota';
        document.getElementById('mascotaId').value = mascota.id_mascota;
        document.getElementById('mascotaNombre').value = mascota.nombre;
        document.getElementById('mascotaTipo').value = mascota.tipo;
        document.getElementById('mascotaRaza').value = mascota.raza || '';
        document.getElementById('mascotaEdad').value = mascota.edad || '';
        document.getElementById('mascotaCliente').value = mascota.id_cliente;
    } else {
        modalTitle.textContent = 'Agregar Mascota';
        mascotaForm.reset();
        document.getElementById('mascotaId').value = '';
    }
    
    mascotaModal.style.display = 'flex';
}

async function guardarMascota() {
    const id = document.getElementById('mascotaId').value;
    const nombre = document.getElementById('mascotaNombre').value;
    const tipo = document.getElementById('mascotaTipo').value;
    const raza = document.getElementById('mascotaRaza').value;
    const edad = parseInt(document.getElementById('mascotaEdad').value) || 0;
    const id_cliente = document.getElementById('mascotaCliente').value;
    
    const mascotaData = { 
        nombre, 
        tipo, 
        raza, 
        edad, 
        id_cliente 
    };
    
    try {
        const url = id ? `/api/mascotas/${id}` : '/api/mascotas';
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mascotaData)
        });
        
        if (response.ok) {
            mascotaModal.style.display = 'none';
            cargarMascotas();
            mostrarExito('Mascota guardada exitosamente');
        } else {
            const error = await response.json();
            mostrarError('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error al guardar mascota:', error);
        mostrarError('Error de conexión');
    }
}

// ========== FUNCIONES PARA PEDIDOS ==========
async function cargarPedidos() {
    try {
        const response = await fetch('/api/pedidos');
        const pedidos = await response.json();
        
        const tbody = document.querySelector('#pedidosTable tbody');
        tbody.innerHTML = '';
        
        pedidos.forEach(pedido => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pedido.id_pedido}</td>
                <td>${pedido.cliente_nombre || 'N/A'}</td>
                <td>${new Date(pedido.fecha).toLocaleDateString()}</td>
                <td>$${pedido.total}</td>
                <td>
                    <span class="estado-pedido estado-${pedido.estado.toLowerCase()}">
                        ${pedido.estado}
                    </span>
                </td>
                <td>${pedido.metodo_pago || ''}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editarPedido(${pedido.id_pedido})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarPedido(${pedido.id_pedido})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
        mostrarError('Error al cargar pedidos');
    }
}

function abrirModalPedido(pedido = null) {
    const modalTitle = document.getElementById('pedidoModalTitle');
    
    if (pedido) {
        modalTitle.textContent = 'Editar Pedido';
        document.getElementById('pedidoId').value = pedido.id_pedido;
        document.getElementById('pedidoCliente').value = pedido.id_cliente;
        document.getElementById('pedidoEstado').value = pedido.estado;
        document.getElementById('pedidoTotal').value = pedido.total;
        document.getElementById('pedidoMetodoPago').value = pedido.metodo_pago;
    } else {
        modalTitle.textContent = 'Agregar Pedido';
        pedidoForm.reset();
        document.getElementById('pedidoId').value = '';
        document.getElementById('pedidoEstado').value = 'Pendiente';
        document.getElementById('pedidoMetodoPago').value = 'Tarjeta';
    }
    
    pedidoModal.style.display = 'flex';
}

async function guardarPedido() {
    const id = document.getElementById('pedidoId').value;
    const id_cliente = document.getElementById('pedidoCliente').value;
    const estado = document.getElementById('pedidoEstado').value;
    const total = parseFloat(document.getElementById('pedidoTotal').value);
    const metodo_pago = document.getElementById('pedidoMetodoPago').value;
    
    const pedidoData = { 
        id_cliente, 
        estado, 
        total, 
        metodo_pago 
    };
    
    try {
        const url = id ? `/api/pedidos/${id}` : '/api/pedidos';
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedidoData)
        });
        
        if (response.ok) {
            pedidoModal.style.display = 'none';
            cargarPedidos();
            mostrarExito('Pedido guardado exitosamente');
        } else {
            const error = await response.json();
            mostrarError('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error al guardar pedido:', error);
        mostrarError('Error de conexión');
    }
}

// ========== FUNCIONES PARA USUARIOS ==========
async function cargarUsuarios() {
    try {
        const response = await fetch('/api/usuarios');
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const usuarios = await response.json();
        
        // Verificar que usuarios sea un array
        if (!Array.isArray(usuarios)) {
            console.error('La respuesta no es un array:', usuarios);
            throw new Error('La respuesta del servidor no es válida');
        }
        
        const tbody = document.querySelector('#usuariosTable tbody');
        tbody.innerHTML = '';
        
        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.id_usuario}</td>
                <td>${usuario.email}</td>
                <td>
                    <span class="rol-usuario rol-${usuario.rol}">
                        ${usuario.rol}
                    </span>
                </td>
                <td>${usuario.cliente_nombre || 'N/A'}</td>
                <td>${usuario.activo ? 'Sí' : 'No'}</td>
                <td>${new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editarUsuario(${usuario.id_usuario})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarUsuario(${usuario.id_usuario})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        mostrarError('Error al cargar usuarios: ' + error.message);
    }
}

function abrirModalUsuario(usuario = null) {
    const modalTitle = document.getElementById('usuarioModalTitle');
    
    if (usuario) {
        modalTitle.textContent = 'Editar Usuario';
        document.getElementById('usuarioId').value = usuario.id_usuario;
        document.getElementById('usuarioEmail').value = usuario.email;
        document.getElementById('usuarioPassword').value = '';
        document.getElementById('usuarioRol').value = usuario.rol;
        document.getElementById('usuarioCliente').value = usuario.id_cliente || '';
        document.getElementById('usuarioActivo').checked = usuario.activo;
        
        // Ocultar/mostrar campo de contraseña
        document.getElementById('usuarioPassword').placeholder = 'Dejar en blanco para no cambiar';
        document.getElementById('usuarioPassword').required = false;
    } else {
        modalTitle.textContent = 'Agregar Usuario';
        usuarioForm.reset();
        document.getElementById('usuarioId').value = '';
        document.getElementById('usuarioRol').value = 'cliente';
        document.getElementById('usuarioActivo').checked = true;
        document.getElementById('usuarioPassword').required = true;
        document.getElementById('usuarioPassword').placeholder = '';
    }
    
    usuarioModal.style.display = 'flex';
}

async function guardarUsuario() {
    const id = document.getElementById('usuarioId').value;
    const email = document.getElementById('usuarioEmail').value;
    const password = document.getElementById('usuarioPassword').value;
    const rol = document.getElementById('usuarioRol').value;
    const id_cliente = document.getElementById('usuarioCliente').value || null;
    const activo = document.getElementById('usuarioActivo').checked;
    
    const usuarioData = { 
        email, 
        rol, 
        id_cliente, 
        activo 
    };
    
    // Solo incluir password si se está creando o cambiando
    if (password) {
        usuarioData.password = password;
    }
    
    try {
        const url = id ? `/api/usuarios/${id}` : '/api/usuarios';
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioData)
        });
        
        if (response.ok) {
            usuarioModal.style.display = 'none';
            cargarUsuarios();
            mostrarExito('Usuario guardado exitosamente');
        } else {
            const error = await response.json();
            mostrarError('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        mostrarError('Error de conexión');
    }
}

// ========== FUNCIONES GLOBALES ==========
function mostrarExito(mensaje) {
    alert(mensaje);
}

function mostrarError(mensaje) {
    alert(mensaje);
}

// ========== FUNCIONES GLOBALES PARA LOS BOTONES ==========

// Categorías
window.editarCategoria = async function(id) {
    try {
        const response = await fetch(`/api/categorias/${id}`);
        const categoria = await response.json();
        abrirModalCategoria(categoria);
    } catch (error) {
        console.error('Error al cargar categoría:', error);
        alert('Error al cargar categoría');
    }
};

window.eliminarCategoria = async function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
        try {
            const response = await fetch(`/api/categorias/${id}`, { method: 'DELETE' });
            
            if (response.ok) {
                cargarCategorias();
                alert('Categoría eliminada exitosamente');
            } else {
                const error = await response.json();
                alert('Error: ' + error.error);
            }
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            alert('Error de conexión');
        }
    }
};

// Productos
window.editarProducto = async function(id) {
    try {
        const response = await fetch(`/api/productos/${id}`);
        const producto = await response.json();
        abrirModalProducto(producto);
    } catch (error) {
        console.error('Error al cargar producto:', error);
        alert('Error al cargar producto');
    }
};

window.eliminarProducto = async function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        try {
            const response = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
            
            if (response.ok) {
                cargarProductos();
                alert('Producto eliminado exitosamente');
            } else {
                const error = await response.json();
                alert('Error: ' + error.error);
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Error de conexión');
        }
    }
};

// Clientes
window.editarCliente = async function(id) {
    try {
        const response = await fetch(`/api/clientes/${id}`);
        const cliente = await response.json();
        abrirModalCliente(cliente);
    } catch (error) {
        console.error('Error al cargar cliente:', error);
        alert('Error al cargar cliente');
    }
};

window.eliminarCliente = async function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        try {
            const response = await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
            
            if (response.ok) {
                cargarClientes();
                alert('Cliente eliminado exitosamente');
            } else {
                const error = await response.json();
                alert('Error: ' + error.error);
            }
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            alert('Error de conexión');
        }
    }
};

// Mascotas
window.editarMascota = async function(id) {
    try {
        const response = await fetch(`/api/mascotas/${id}`);
        const mascota = await response.json();
        abrirModalMascota(mascota);
    } catch (error) {
        console.error('Error al cargar mascota:', error);
        alert('Error al cargar mascota');
    }
};

window.eliminarMascota = async function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
        try {
            const response = await fetch(`/api/mascotas/${id}`, { method: 'DELETE' });
            
            if (response.ok) {
                cargarMascotas();
                alert('Mascota eliminada exitosamente');
            } else {
                const error = await response.json();
                alert('Error: ' + error.error);
            }
        } catch (error) {
            console.error('Error al eliminar mascota:', error);
            alert('Error de conexión');
        }
    }
};

// Pedidos
window.editarPedido = async function(id) {
    try {
        const response = await fetch(`/api/pedidos/${id}`);
        const pedido = await response.json();
        abrirModalPedido(pedido);
    } catch (error) {
        console.error('Error al cargar pedido:', error);
        alert('Error al cargar pedido');
    }
};

window.eliminarPedido = async function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
        try {
            const response = await fetch(`/api/pedidos/${id}`, { method: 'DELETE' });
            
            if (response.ok) {
                cargarPedidos();
                alert('Pedido eliminado exitosamente');
            } else {
                const error = await response.json();
                alert('Error: ' + error.error);
            }
        } catch (error) {
            console.error('Error al eliminar pedido:', error);
            alert('Error de conexión');
        }
    }
};

// Usuarios
window.editarUsuario = async function(id) {
    try {
        const response = await fetch(`/api/usuarios/${id}`);
        const usuario = await response.json();
        abrirModalUsuario(usuario);
    } catch (error) {
        console.error('Error al cargar usuario:', error);
        alert('Error al cargar usuario');
    }
};

window.eliminarUsuario = async function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
            const response = await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
            
            if (response.ok) {
                cargarUsuarios();
                alert('Usuario eliminado exitosamente');
            } else {
                const error = await response.json();
                alert('Error: ' + error.error);
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            alert('Error de conexión');
        }
    }
};