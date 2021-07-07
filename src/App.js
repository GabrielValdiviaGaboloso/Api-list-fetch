import { useEffect, useState } from "react";

const App = () => {
  const [state, setState] = useState({
    tareas: null,
    tarea: {
      name: ""
    },
  });

  useEffect(() => {
    getTareas("https://assets.breatheco.de/apis/fake/todos/user/gabriel", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }, []);

  const getTareas = (url, options = {}) => {
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setState((prevState) => {
          return {
            ...prevState,
            tareas: data,
          };
        });
      });
  };

  const addTarea = (url, options = {}) => {
    console.log("entro");
    fetch(url, options)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          getTareas("https://assets.breatheco.de/apis/fake/todos/user/gabriel");
        } else {
          alert("Ocurrio un error");
        }
      });
  };

  const addTarea2 = (url, options = {}) => {
    console.log("entro");
    fetch(url, options)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          console.log("exitoso");
        } else {
          alert("Ocurrio un error");
        }
      });

  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newTarea = {
      label: state.tarea.name,
      done: false
    }

    state.tareas.push(newTarea);
    console.log(state.tareas);
    const { tarea } = state;
    let options = {
      method: "PUT",
      body: JSON.stringify(state.tareas),
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (tarea.label !== "") {
      addTarea("https://assets.breatheco.de/apis/fake/todos/user/gabriel", options);
    } else {
      alert("Debe Ingresar un role");
    }
  };

  const cambio = (e) => {
    const { tarea } = state;
    tarea[e.target.name] = e.target.value;
    setState((prevState) => {
      return {
        ...prevState,
        tarea,
      };
    });
  };

  const eliminarTarea = (index) => {
    console.log(index);
    state.tareas.splice(index, 1);
    let options = {
      method: "PUT",
      body: JSON.stringify(state.tareas),
      headers: {
        "Content-Type": "application/json",
      },
    };
    addTarea(`https://assets.breatheco.de/apis/fake/todos/user/gabriel`, options);
  }
  const borrarTodo = async () => {
    console.log("entro a eliminar");
    let options = {
      method: "DELETE",
      body: JSON.stringify(state.tareas),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await addTarea2(`https://assets.breatheco.de/apis/fake/todos/user/gabriel`, options);
    console.log("termino eliminar");

  }

  const obtenerNuevaList = async () => {
    await borrarTodo();

  }
  const despuesdeborrar = () => {
    crearNuevasLista();
  }




  const crearNuevasLista = () => {
    console.log("entro a crear");
    let options = {
      method: "POST",
      body: JSON.stringify(state.tareas),
      headers: {
        "Content-Type": "application/json",
      },
    };
    addTarea(`https://assets.breatheco.de/apis/fake/todos/user/gabriel`, options);
    console.log("termino crear");

  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="tarea_name"
            name="name"
            placeholder="Jugar con mi perrita"
            value={state.tarea.name}
            onChange={cambio}
          />
          <label htmlFor="tarea_name" className="form-label">
            Tarea
          </label>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Agregar Tarea
          </button>

        </div>
      </form>

      <ul className="list-group m-4" style={{ width: "50%" }}>
        <h4>Lista de Tareas</h4>
        {!!state.tareas &&
          state.tareas.map((tarea, index) => {
            return (
              <li
                key={index}
                className={
                  "list-group-item list-group-item-action d-flex justify-content-between"
                }


              >
                {tarea.label}
                <p onClick={() => eliminarTarea(index)}>x</p>
              </li>


            );
          })}
      </ul>
    </>
  );
};

export default App;
