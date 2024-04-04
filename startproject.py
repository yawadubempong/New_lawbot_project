import subprocess
import os

def git_pull():
    repository_path = subprocess.check_output(["git", "rev-parse", "--show-toplevel"], stderr=subprocess.STDOUT).decode().strip()
    try:
        # Change directory to the repository path
        subprocess.run(["git", "-C", repository_path, "pull"], check=True)
        print("Git pull successful.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing git pull: {e}")
        

def start_local_project():
    # Navigate to the project directory
    git_pull()
    project_directory = "/backend/lawbotProject/"
    

    # Activate virtual environment if needed
    # Replace 'venv/bin/activate' with your virtual environment activation script
    subprocess.run(["source", "/backend/lawbotenv/Scripts/activate"], shell=True)
    
    subprocess.run(["cd", project_directory], shell=True)

    # Run any necessary commands to start your project
    # For example, if you're using Django, you might run 'python manage.py runserver'
    subprocess.run(["python", "manage.py", "runserver"], shell=True)



if __name__ == "__main__":
    start_local_project()
        


