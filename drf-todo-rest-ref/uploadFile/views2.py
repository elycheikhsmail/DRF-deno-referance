from django.shortcuts import redirect, render
from .forms import DocumentForm


def model_form_upload(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = DocumentForm()
    return render(request, 'uploadFile/model_form_upload.html', {
        'form': form
    })
    


def home(request): 
    return render(request, 'uploadFile/home.html')