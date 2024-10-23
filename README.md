# Snippet Library

## Distinctiveness and Complexity
My project offers a distinct solution by providing a tool for storing and retrieving useful code snippets based on their descriptions. This addresses a common need among developers: efficiently managing reusable code or snippets across different programming languages and purposes. The core functionality that sets this project apart includes a code editor with language-specific syntax highlighting, making the snippets more readable and user-friendly. Additionally, a text search feature allows users to quickly find snippets, which are categorized by language, further enhancing the project's utility and distinctiveness. I've added a custom debounce function to make sure the server is not overwhelmed by requests from client. I've worked with a few different front-end frameworks, but the state management in this app turned out to be more complex than I expected. So, I decided to use the latest Material-UI (MUI) library, which is both responsive and intuitive, ensuring a seamless user experience across different screen sizes.

I think the most complex part of this project is the authentication workflow. I aimed for a more modern approach by using token-based authentication instead of session-based. The process begins with generating a token through the Django REST framework. This token is then stored in the client using React's context store and local storage, ensuring persistence across renders. Additionally, the project handles Cross-Site Request Forgery (CSRF) protection by dynamically including CSRF tokens in POST requests, securing all operations against XSS attacks. Protected routes are implemented using React Router, ensuring that only authenticated users can access certain areas of the application. Moreover, Django REST framework decorators are employed to secure internal URLs, enforcing a standard code architecture that prioritizes security and maintainability. I also use React Query, which might be a bit overkill for now, but I plan to enhance this project further. As the data grows, having a frontend tool for caching and easy invalidation will become more important.

## Project Structure
- Client
  - src
    - components
      - hooks
        - useAuth.tsx
          Provides user authentication functionalities: login, logout, signup.
          Stores the bearer token in a cookie and user information in local storage.
        - useScreenSize.tsx
          Determines the small screen breakpoint (600px), matching MUI's breakpoint.
        - useScreenWidth.tsx
          Keeps track of the screen width.
      - AddSnippetDialog.tsx
      - Dashboard.tsx
      - MainSection.tsx
      - Navbar.tsx
      - ProtectedRoute.tsx
      - Sidebar.tsx
      - SigninPage.tsx
        These are the main UI components. A couple of files responsible for adding/editing data use React Query's mutation hook. Other display-only files use the `useQuery` hook from React Query. After a mutation is called, the corresponding query key is invalidated and automatically re-fetches the most up-to-date data. Forms include simple validation using alerts with a timeout. The AppBar at the top hides some elements on smaller screens. The Sidebar is also responsive on smaller screens and permanent on larger screens.
    - types
      - const.ts
        Contains some hardcoded values, e.g., a list of languages supported by the code editor.
      - QueryKeys.ts
        Serves as the single source of truth for query keys to ensure data and query validity and integrity.
    - utils
      - BrowserStorage.ts
        A thin wrapper around LocalStorage and the js-cookie library. The main purpose is to have strongly typed functions and classes.
      - Common.ts
        Contains a debounce decorator.
      - Request.ts
        A thin wrapper around Axios to reduce redundancy in checking the CSRF token and attaching the bearer token.
  - App.tsx
    Contains BrowserRouter, AuthProvider, QueryClientProvider, and routing (for both public and protected routes).
- Server
  The server folder contains pretty standard Django files. Using serializers definitely simplifies the CRUD process on the back-end. I added a custom token authentication processor to return user information to the client.
  - models.py
    I have only one custom model, which is Snippet. It has a ForeignKey referring to Django's native User model.
## How to run
Make sure to install all dependencies and run the migrations on the backend.
Client and server need to be run separately, ex for dev:
`npm run dev` for the client
`python manage.py runserver` for backend
