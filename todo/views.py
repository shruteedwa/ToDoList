from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST
from django.http import JsonResponse

from .models import Todo
from .forms import TodoForm


# Create your views here.
def index(request):
	todolist = Todo.objects.order_by('id')

	form = TodoForm()

	context = {'todolist' : todolist, 'form' : form}

	return render(request, 'todo/index.html', context)

@require_POST
def addTodo(request):
	form = TodoForm(request.POST)

	print(request.POST['text'])
	response_data = {
		'id' : None,
		'text': 'Error'
		}

	if form.is_valid():
		Todo(text=request.POST['text']).save()
		todo = Todo.objects.all().last()

		response_data = {
		'id' : todo.id,
		'text': todo.text
		}

	return JsonResponse(response_data)

	
def completeTodo(request, todo_id):
	isComplete = request.GET.get("isComplete").lower() in ['true', '1']
	todo = Todo.objects.get(pk=todo_id)
	todo.complete = isComplete
	todo.save()

	return redirect('index')

def deleteTodo(request, todo_id):
	Todo.objects.get(pk=todo_id).delete()

	return redirect('index')