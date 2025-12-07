from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(edges: List[Edge], nodes: List[Node]) -> bool:
    """
    Validate if the graph is a Directed Acyclic Graph (DAG)
    Uses DFS to detect cycles
    """
    # Build adjacency list
    graph = {}
    node_ids = {node.id for node in nodes}
    
    for node_id in node_ids:
        graph[node_id] = []
    
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)
    
    # Track visited nodes and nodes in current recursion stack
    visited = set()
    rec_stack = set()
    
    def has_cycle(node_id: str) -> bool:
        visited.add(node_id)
        rec_stack.add(node_id)
        
        # Visit all neighbors
        for neighbor in graph.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                # Back edge found, cycle detected
                return True
        
        rec_stack.remove(node_id)
        return False
    
    # Check all nodes (handling disconnected components)
    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(node_id):
                return False
    
    return True

@app.get("/")
def read_root():
    return {"message": "VectorShift Pipeline Backend API"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    """
    Parse pipeline and return statistics
    
    Returns:
        - num_nodes: Number of nodes in pipeline
        - num_edges: Number of edges in pipeline
        - is_dag: Whether the pipeline is a valid DAG
    """
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        is_valid_dag = is_dag(pipeline.edges, pipeline.nodes)
        
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_valid_dag
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
